import jwt from "jsonwebtoken";
const authMdw = (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
    if (!accessToken) {
      res.status(400).json({
        message: "Missing access token",
      });
    }
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token has expired",
      });
    } else {
      return res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  }
};
export default authMdw;
