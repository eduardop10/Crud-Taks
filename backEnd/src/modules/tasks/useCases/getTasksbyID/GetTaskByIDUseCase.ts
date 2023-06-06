import { Task } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetTaskByIDUseCase {
  async execute(id: number): Promise<Task | null> {
    const task = await prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    return task;
  }
}
