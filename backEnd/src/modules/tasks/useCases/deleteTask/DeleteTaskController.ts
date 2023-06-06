import { Request, Response } from "express";
import { DeleteTaskUseCase } from "./DeleteTaskUseCase";


export class DeleteTaskController {
  async handle(req: Request, res: Response) {

    const id = parseInt(req.params.id, 10);

    const deleteTaskUseCase = new DeleteTaskUseCase();

    const result = await deleteTaskUseCase.execute({ id});

    return res.status(200).json(result);
  }
}

