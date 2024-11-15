// todoRepository.ts
import { PrismaClient, Task } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateTaskData {
    title: string;
    completed?: boolean;
}

export interface UpdateTaskData {
    title?: string;
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

    async getAllTasks(): Promise<Task[]> {
        return await prisma.task.findMany();
    },

    async deleteTask(id: number): Promise<number> {
        await prisma.task.delete({
            where: { id },
        });
        return id;
    },

    async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
        const updatedTask = await prisma.task.update({
            where: { id },
            data,
        });
        return updatedTask;
    },

    async deleteAllTasks(): Promise<number> {
        const result = await prisma.task.deleteMany({});
        return result.count;
    },
};
