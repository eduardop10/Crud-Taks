import { Task, Priority } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { UpdateTaskDTO } from "../../dtos/UpdateTaskDTO";
import { UpdateTaskValidationDTO } from "../../dtos/UpdateTaskValidationDTO";

export class UpdateTaskUseCase {
  async execute({ id, title, description, createdAt, dueDate, priority }: UpdateTaskDTO): Promise<Task> {
    // Validação dos dados
    const { error } = UpdateTaskValidationDTO.validate({
      id,
      title,
      description,
      createdAt,
      dueDate,
      priority,
    });

    if (error) {
      throw new AppError(error.details[0].message);
    }

    // Create Task
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        dueDate,
        priority,
      },
    });

    return task;
  }
}
