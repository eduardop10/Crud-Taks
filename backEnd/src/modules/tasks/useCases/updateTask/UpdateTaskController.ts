import { Request, Response } from "express";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase";


export class UpdateTaskController {
  async handle(req: Request, res: Response) {

    const id = parseInt(req.params.id, 10);

    const { title, description, createdAt, dueDate, priority } = req.body;

    const updateTaskUseCase = new UpdateTaskUseCase();

    const result = await updateTaskUseCase.execute({ id, title, description, createdAt, dueDate, priority });

    return res.status(201).json(result);
  }
}

