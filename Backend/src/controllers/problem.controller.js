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

    const category = "INFRASTURCTURE";

    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        location: JSON.stringify(locationData),
        clustorId: 1,
        image: imageUrl,
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
    const { clustorId } = req.body;

    const problems = await prisma.problem.findMany({
      where: {
        clustorId,
      },
    });

    if (!problems) {
      return res.status(404).json(new ApiError(404, "Problem not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Problem found", problems));
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message));
  }
};

export const voting = async (req, res) => {
  try {
    const problemId = parseInt(req.params.id);
    const userId = req.user.id;

    const existingVote = await prisma.vote.findFirst({
      where: { userId, problemId }
    });

    if (existingVote) {
      await prisma.$transaction([
        prisma.vote.delete({ where: { id: existingVote.id } }),
        prisma.problem.update({
          where: { id: problemId },
          data: { voteCount : { decrement: 1 } }
        })
      ]);

      return res.status(200).json(new ApiResponse(200, "Vote removed"));
    } else {
      await prisma.$transaction([
        prisma.vote.create({ data: { userId, problemId } }),
        prisma.problem.update({
          where: { id: problemId },
          data: { voteCount : { increment: 1 } }
        })
      ]);

      return res.status(200).json(new ApiResponse(200, "Vote added"));
    }
  } catch (err) {
    return res.status(500).json(new ApiError(500, err.message));
  }
};

export const rateProblem = async ( req , res) => {
  // console.log("HYy");
    try{
      const problemId = parseInt(req.params.id);
      const userId = req.user.id;
      const { rating } = req.body;
      console.log(rating)

      const existingRating = await prisma.rating.findFirst({
        where : { userId , problemId }
      })
      console.log(existingRating)

      if(existingRating){
        await prisma.rating.update({
          where : { id : existingRating.id},
          data : { rating }
        })
      }else{
        await prisma.rating.create({
          data : { userId , problemId , rating}
        });
      }

      const { _avg } = await prisma.rating.aggregate({
        where : { problemId },
        _avg : { rating : true}
      })

      await prisma.problem.update({
        where : { id : problemId},
        data : { rating : _avg.rating || 0}
      });

      return res.status(200).json(new ApiResponse(200, {}, { averageRating: _avg.rating }));

    }catch(err){
      return res.status(500).json(new ApiError(500 , err.message))
    }
}

export const deleteProblem = async ( req , res) => {
  try{
    const problemId = parseInt(req.params.problemId); 
    const userId = req.user.id;

    const problem = await prisma.problem.findFirst({
      where : { id : problemId , userId }
    })

    if (!problem) {
      return res.status(403).json(new ApiError(403, "You can't delete this problem"));
    }
    await prisma.problem.delete({
      where : { id : problemId }
    });

    return res.status(200).json(new ApiResponse(200, "Problem deleted successfully"));
  }catch(err){
    return res.status(500).json(new ApiError(500 , err.message))
  }
}