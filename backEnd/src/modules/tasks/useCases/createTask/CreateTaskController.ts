import { Request, Response } from "express";
import { CreateTaskUseCase } from "./CreateTaskUseCase";
import { AppError } from "../../../../errors/AppError";


export class CreateTaskController {
  async handle(req: Request, res: Response) {

    const { title, description,  dueDate, priority } = req.body;
    const createdAt = new Date(); 

    const createTaskUseCase = new CreateTaskUseCase();

    const result = await createTaskUseCase.execute({ title, description, createdAt, dueDate, priority });

    return res.status(201).json(result);
  }
}

