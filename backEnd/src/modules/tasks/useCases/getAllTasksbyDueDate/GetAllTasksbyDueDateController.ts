import { Request, Response } from "express";
import { GetAllTasksbyDueDateUseCase } from "./GetAllTasksbyDueDateUseCase";


export class GetAllTasksbyDueDateController {
  async handle(req: Request, res: Response) {

    const getAllTasksbyDueDateController = new GetAllTasksbyDueDateUseCase();

    const result = await getAllTasksbyDueDateController.execute();

    return res.status(200).json(result);
  }
}

