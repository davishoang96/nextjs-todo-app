import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTask(data) {
    return await prisma.todo.create(data);
}

export async function getAllTasks() {
    return await prisma.todo.findMany();
}

