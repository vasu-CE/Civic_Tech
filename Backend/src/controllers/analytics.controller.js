import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../utils/prismClient.js"
import { format } from "date-fns";


export const leaderBoard = async ( req , res) => {
   
    try{
        const authorId = req.user.id;

        const author = await prisma.user.findFirst({
            where : { id : authorId },
            select : { city : true }
        })

        const users = await prisma.user.findMany({
            where : {
                city : author.city
            },
            include : {
                problems : {
                    include : {
                        votes : true,
                        Rating : true
                    }
                }
            }
        });

        const leaderboard = users.map((user) => {
            let totalVotes = 0;
            let totalRatings = 0;
            let ratingCount = 0;
            let solvedProblems = 0;
        
            user.problems.forEach((problem) => {
              totalVotes += problem.votes.length;
              totalRatings += problem.Rating.reduce((sum, r) => sum + r.rating, 0);
              ratingCount += problem.Rating.length;
        
              if (problem.status === "ACCEPTED") {
                solvedProblems++;
              }
            });
            console.log(solvedProblems)
            const avgRating = ratingCount > 0 ? totalRatings / ratingCount : 0;
            const score = totalVotes + avgRating * 2 + solvedProblems * 3;
        
            return {
              id: user.id,
              name: user.name,
              profilePic: user.profilePic,
              totalVotes,
              avgRating: avgRating.toFixed(1),
              solvedProblems,
              score: score.toFixed(2)
            };
          });
        
          leaderboard.sort((a, b) => b.score - a.score);

          const rankedLeaderboard = leaderboard.slice(0, 10).map((user, index) => ({
            rank: index + 1, 
            ...user
          }));
          return res.status(200).json(new ApiResponse(200 , rankedLeaderboard))
    }catch(err){
        return res.status(500).json(new ApiError(500 , err.message));
    }
}

export const getAnalyticsData = async (req, res) => {
  try {
    const totalIssues = await prisma.problem.count();
    const resolvedIssues = await prisma.problem.count({
      where: { status: "ACCEPTED" },
    });
    const rejectedIssues = await prisma.problem.count({
      where: { status: "REJECTED" },
    });
    const inProgressIssues = await prisma.problem.count({
      where: { status: "IN_PROGRESS" },
    });
    const reportedIssues = await prisma.problem.count({
      where: { status: "REPORTED" },
    });

    res.json({
      totalIssues,
      resolvedIssues,
      rejectedIssues,
      inProgressIssues,
      pendingReview: reportedIssues,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching analytics data" });
  }
};

// Get weekly analytics data
export const getWeeklyData = async (req, res) => {
  try {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    const weeklyData = await prisma.problem.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: oneWeekAgo } },
      _count: { id: true },
    });

    res.json(weeklyData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weekly data" });
  }
};


export const getLastMonthData = async (req, res) => {
  try {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const problems = await prisma.problem.findMany({
      where: { createdAt: { gte: oneMonthAgo } },
      select: { createdAt: true, status: true },
    });

    // Organize data by date
    const lastMonthData = {};

    problems.forEach(({ createdAt, status }) => {
      const dateKey = format(new Date(createdAt), "d MMM");

      if (!lastMonthData[dateKey]) {
        lastMonthData[dateKey] = { date: dateKey, reported: 0, resolved: 0, inProgress: 0 };
      }

      lastMonthData[dateKey].reported += 1;
      if (status === "resolved") lastMonthData[dateKey].resolved += 1;
      if (status === "inProgress") lastMonthData[dateKey].inProgress += 1;
    });

    // Convert object to an array sorted by date
    const formattedData = Object.values(lastMonthData).sort(
      (a, b) => Date.parse(`${a.date} ${today.getFullYear()}`) - Date.parse(`${b.date} ${today.getFullYear()}`)
    );

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching last month data:", error);
    res.status(500).json({ error: "Error fetching last month data" });
  }
};

// Get issue categories data
// Define the helper function
const formatCategoryName = (category) => {
  const formattedMap = {
    INFRASTURCTURE: "Infrastructure",
    ENVIRONMENT: "Environment",
    COMMUNITY_SERVICES: "Community Services",
    ELECTRICITY: "Electricity",
    PUBLIC_SAFETY: "Public Safety",
  };
  return formattedMap[category] || category.replace(/_/g, " ");
};

export const getIssueCategories = async (req, res) => {
  try {
    const categories = await prisma.problem.groupBy({
      by: ["category"],
      _count: { id: true },
    });

    const formattedCategories = categories.map((category) => ({
      name: formatCategoryName(category.category),
      count: category._count.id,
    }));

    res.json({ issueCategories: formattedCategories });
  } catch (error) {
    console.error("Error fetching issue categories:", error);
    res.status(500).json({ error: error.message || "Error fetching issue categories" });
  }
};



// Get recent activity
export const getRecentActivity = async (req, res) => {
  try {
    const recentActivity = await prisma.problem.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        title: true,
        location: true,
        createdAt: true,
        status: true,
      },
    });
    // console.log(recentActivity)

    res.json(recentActivity);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recent activity" });
  }
};