import { Task, Priority } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { DeleteTaskDTO } from "../../dtos/DeleteTaskDTO";
import { DeleteTaskValidationDTO } from "../../dtos/DeleteTaskValidationDTO";

export class DeleteTaskUseCase {
  async execute({ id }: DeleteTaskDTO): Promise<void> {
    // data validation
    const { error } = DeleteTaskValidationDTO.validate({
      id,
    });

    if (error) {
      throw new AppError(error.details[0].message);
    }

    // Verify task existence
    const existingTask = await prisma.task.findUnique({ where: { id: id } });
    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    // delete the task
    await prisma.task.delete({ where: { id: id } });
  }
}
