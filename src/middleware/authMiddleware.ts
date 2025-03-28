
import jwt from "jsonwebtoken";

export const protect = async (req: any, res: any, next: any) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized - No token provided" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export const isAdmin = async (req: any, res: any, next: any) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden - Admins only" });
  }
  next();
};
