import { Task, Priority } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateTaskDTO } from "../../dtos/CreateTaskDTO";
import { CreateTaskValidationDTO } from "../../dtos/CreateTaskValidationDTO";

export class CreateTaskUseCase {
  async execute({ title, description, createdAt, dueDate, priority }: CreateTaskDTO): Promise<Task> {
    // Validação dos dados
    const { error } = CreateTaskValidationDTO.validate({
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
    const task = await prisma.task.create({
      data: {
        title,
        description,
        createdAt,
        dueDate,
        priority: priority as Priority,
      },
    });

    return task;
  }
}
