export default function authorize(Allowedrole) {
  return (req, res, next) => {
    if (req.user.role !== Allowedrole) {
      console.log("Not authorized to do that");
      return res.status(403).json({ Message: "Forbidden" });
    }
    next();
  };
}
