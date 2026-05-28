import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    // TOKEN CHECK
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // EMPTY TOKEN DATA CHECK
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.admin = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authMiddleware;