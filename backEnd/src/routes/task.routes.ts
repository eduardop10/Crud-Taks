import { Router } from "express";
import { CreateTaskController } from "../modules/tasks/useCases/createTask/CreateTaskController";
import { GetTaskByIDController } from "../modules/tasks/useCases/getTasksbyID/GetTaskByIDController";
import { GetAllTasksbyDueDateController } from "../modules/tasks/useCases/getAllTasksbyDueDate/GetAllTasksbyDueDateController";
import { UpdateTaskController } from "../modules/tasks/useCases/updateTask/UpdateTaskController";
import { DeleteTaskController } from "../modules/tasks/useCases/deleteTask/DeleteTaskController";

const createTaskConntroller = new CreateTaskController();
const getTaskbyIDController = new GetTaskByIDController();
const getAllTasksbyDueDateController = new GetAllTasksbyDueDateController(); 
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

const taskRoutes = Router();

taskRoutes.post("/", createTaskConntroller.handle);
taskRoutes.get("/", getAllTasksbyDueDateController.handle);
taskRoutes.get("/:id", getTaskbyIDController.handle);
taskRoutes.put("/:id", updateTaskController.handle);
taskRoutes.delete("/:id", deleteTaskController.handle);

export { taskRoutes };