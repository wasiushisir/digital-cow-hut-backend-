import express from "express";
const router = express.Router();
import userRoute from "../modules/user/user.route";
import cowRoute from "../modules/cow/cow.route";
import orderRoute from "../modules/orders/orders.route";

const moduleRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/cows",
    route: cowRoute,
  },

  {
    path: "/orders",
    route: orderRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
