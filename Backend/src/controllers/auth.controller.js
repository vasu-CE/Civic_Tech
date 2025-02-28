import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../utils/prismClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password, lat, long } = req.body;

    let address = "";

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
      );
      if (!response.ok)
        return res.status(402).json(new ApiError(402, "Location not found"));
      const data = await response.json();
      if (data.address.state_district) address = data.address.state_district;
    } catch (fetchError) {
      return res.status(402).json(new ApiError(402, "Location not found"));
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json(new ApiError(401, "Invalid Credentials"));
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(200)
      .json(new ApiResponse(200, "Login Successfull", { user, address }));
  } catch (err) {
    console.log(err);
    return res.status(500).json(new ApiError(500, "internal Server Error"));
  }
};

export const signup = async (req, res) => {
  try {
    const { email, name, password, lat, long } = req.body;

    if (!lat || !long) {
      return res.status(404).json(new ApiError(404, "Location not found"));
    }
    let isGov = false;
    if (email.endsWith("@gov.in")) {
      isGov = true;
    }

    const isExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (isExist) {
      return res.status(404).json(new ApiError(402, "User already exist"));
    }
    let address = "";
    let city = "";
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
      );
      if (!response.ok) throw new Error("Failed to fetch location data");
      const data = await response.json();
      if (data.display_name) {
        address = data.display_name;
        city = data.address.state_district;
      }
    } catch (fetchError) {
      return res.status(402).json(new ApiError(402, "Location not found"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        houseLocation: address,
        city,
        isGoverment: isGov,
      },
    });
    address = address.split(",")[0];

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json(new ApiResponse(200, {}, { user, address }));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, err.message || "Internal server error"));
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        problems: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 3,
        },
        Rating: true,
      },
    });

    if (!user) {
      return res.status(404).json(new ApiError(404 , "User not found"));
    }

    const analytics = await prisma.analytics.findFirst();

    const formattedProfile = {
      name: user.name,
      email: user.email,
      address: user.houseLocation
        ? `${user.houseLocation}`
        : "Not Provided",
      avatar: user.profilePic || "/default-avatar.jpg",
      joinedDate: user.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
      problemsPosted: user.problems.length,
      problemsResolved: analytics?.solvedProblems || 0,
      inProgress: analytics?.inProgress || 0,
      pending:
        analytics?.totalProblems -
          (analytics?.solvedProblems + analytics?.inProgress) || 0,
      rating: user.Rating.length
        ? (
            user.Rating.reduce((acc, r) => acc + r.rating, 0) /
            user.Rating.length
          ).toFixed(1)
        : 0,
      recentActivity: user.problems.map((problem) => ({
        id: problem.id,
        type: "post",
        title: problem.title,
        status: problem.status.toLowerCase(),
        date: problem.createdAt.toDateString(),
      })),
    };

    // res.json(formattedProfile);
    return res.status(200).json(new ApiResponse(200 , formattedProfile));
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
