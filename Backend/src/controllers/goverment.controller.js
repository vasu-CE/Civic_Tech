// import prisma from "../prismaClient.js"; 

import prisma from "../utils/prismClient.js";

export const approveProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    const problem = await prisma.problem.update({
      where: { id: Number(problemId) },
      data: { status: "IN_PROGRESS" },
    });

    res.json({ message: "Problem approved successfully", problem });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve problem" });
  }
};

export const rejectProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    const problem = await prisma.problem.update({
      where: { id: Number(problemId) },
      data: { status: "REJECTED" },
    });

    res.json({ message: "Problem rejected successfully", problem });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject problem" });
  }
};

export const acceptProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    const problem = await prisma.problem.update({
      where: { id: Number(problemId) },
      data: { status: "ACCEPTED" },
    });

    res.json({ message: "Problem accepted successfully", problem });
  } catch (error) {
    res.status(500).json({ error: "Failed to accept problem" });
  }
};
