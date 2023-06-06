import { Request, Response } from "express";
import { GetTaskByIDUseCase } from "./GetTaskByIDUseCase";


export class GetTaskByIDController {
  async handle(req: Request, res: Response) {

    const id = parseInt(req.params.id, 10);

    const getTasksbyIDController = new GetTaskByIDUseCase();

    const result = await getTasksbyIDController.execute(id);

    return res.status(200).json(result);
  }
}

