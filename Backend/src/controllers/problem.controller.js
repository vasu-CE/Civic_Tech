import prisma from "../utils/prismClient.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const uploadProblem = async (req, res) => {
  try {
    const { title, description } = req.body;
    const locationData = JSON.parse(req.body.location);

    const authorId = req.user.id;

    if (!title || !description || !locationData || !req.file) {
      return res.status(404).json(404, "All fields are required");
    }

    const imageUrl = req.file.path; 

    const category = "INSFRASTURCTURE";

    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        location: JSON.stringify(locationData),
        clustorId: 1,
        image : imageUrl,
        category,
        user: {
          connect: {
            id: authorId,
          },
        },
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Problem uploaded successfully", problem));
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(new ApiError(500, err.message));
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const {clustorId} = req.body;

    const problems = await prisma.problem.findMany({
      where: {
        clustorId
      },
    });

    if (!problems) {
      return res.status(404).json(new ApiError(404, "Problem not found"));
    }

    return res.status(200).json(new ApiResponse(200, "Problem found", problems));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message));
  }
};

export const upvote = async (req , res) => {
  
}

