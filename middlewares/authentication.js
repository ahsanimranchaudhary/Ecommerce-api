import jwt from "jsonwebtoken";
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Successfully authenticated");
    next();
  } catch (err) {
    res.status(403).send("Invalid token");
    console.log("Authentication failed");
  }
};
export default authenticateUser;
