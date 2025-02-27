export const isAdmin = (req, res, next) => {
  if (req.user.role != "ADMIN") {
    return res
      .status(403)
      .json({ message: "You are not authorized to access this route" });
  }
  next();
};

export const isStudent = (req, res, next) => {
  if (req.user.role != "STUDENT") {
    return res
      .status(403)
      .json({ message: "You are not authorized to access this route" });
  }
  next();
};

export const isFaculty = (req, res, next) => {
  if (req.user.role != "FACULTY") {
    return res
      .status(403)
      .json({ message: "You are not authorized to access this route" });
  }
  next();
};


