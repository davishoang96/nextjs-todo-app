// todoRepository.ts
import { PrismaClient, Task } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateTaskData {
  title: string;
  completed?: boolean;
}

export const TodoRepository = {
  async createTask(data: CreateTaskData): Promise<Task> {
    const newTask = await prisma.task.create({
      data: {
        title: data.title,
        completed: data.completed ?? false,
      },
    });
    return newTask;
  },
};
