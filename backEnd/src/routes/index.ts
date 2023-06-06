import { Router } from "express";
import { taskRoutes } from "./task.routes";

const routes = Router();

routes.use("/tasks", taskRoutes);
/*routes.use("/movies", movieRoutes); */

export { routes };
