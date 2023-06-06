import { Task } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetAllTasksbyDueDateUseCase {
  async execute(): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      orderBy: [
        {
          dueDate: "asc",
        }
      ],
    });

    return tasks;
  }
}
