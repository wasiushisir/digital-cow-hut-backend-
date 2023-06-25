import express from "express";
const router = express.Router();
import userRoute from "../modules/user/user.route";

const moduleRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
