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