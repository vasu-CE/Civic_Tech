import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../utils/prismClient.js"

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

    const activeUsers = await prisma.user.count();
    const responseRate = ((resolvedIssues / totalIssues) * 100).toFixed(2);

    res.json({
      totalIssues,
      resolvedIssues,
      rejectedIssues,
      inProgressIssues,
      pendingReview: reportedIssues,
      activeUsers,
      responseRate,
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

// Get last month's analytics data
export const getLastMonthData = async (req, res) => {
  try {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const lastMonthData = await prisma.problem.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: oneMonthAgo } },
      _count: { id: true },
    });

    res.json(lastMonthData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching last month data" });
  }
};

// Get issue categories data
export const getIssueCategories = async (req, res) => {
  try {
    const categories = await prisma.problem.groupBy({
      by: ["category"],
      _count: { id: true },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching issue categories" });
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