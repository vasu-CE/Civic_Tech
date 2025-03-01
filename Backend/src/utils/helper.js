export const isGovernment = (req, res, next) => {
  console.log(req.user)
  if (req.user.isGovernment) {
    return res
      .status(403)
      .json({ message: "You are not authorized to access this route" });
  }
  next();
};
