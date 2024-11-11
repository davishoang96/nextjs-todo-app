import {
    TodoRepository,
    CreateTaskData,
    UpdateTaskData
} from "../src/repositories/todoRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

jest.mock("@prisma/client", () => {
    const mPrismaClient = {
        task: {
            create: jest.fn(),
            update: jest.fn(),
            findMany: jest.fn(),
            delete: jest.fn(),
            deleteMany: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe("TodoRepository", () => {
    const mockData: CreateTaskData = { title: "Test Task" };
    const mockTask = { id: 1, title: "Test Task", completed: false };
    const mockTasks = [
        { id: 1, title: "Test Task 1", completed: false },
        { id: 2, title: "Test Task 2", completed: true },
    ];

    const mockUpdateData: UpdateTaskData = { title: "Updated Task" };
    const mockUpdatedTask = { id: 1, title: "Updated Task", completed: false };

    beforeEach(() => {
        (prisma.task.create as jest.Mock).mockResolvedValue(mockTask);
        (prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks);
        (prisma.task.update as jest.Mock).mockResolvedValue(mockUpdatedTask);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("createTask", () => {
        it("should create a new task", async () => {
            const result = await TodoRepository.createTask(mockData);

            expect(prisma.task.create).toHaveBeenCalledWith({
                data: { title: mockData.title, completed: false },
            });
            expect(result).toEqual(mockTask);
        });
    });

    describe("getAllTasks", () => {
        it("should return all tasks", async () => {
            const result = await TodoRepository.getAllTasks();

            expect(prisma.task.findMany).toHaveBeenCalled();
            expect(result).toEqual(mockTasks);
        });
    });

    describe("deleteTask", () => {
        it("should delete a task by its ID and return the ID", async () => {
            const taskId = 1;
            const result = await TodoRepository.deleteTask(taskId);

            expect(prisma.task.delete).toHaveBeenCalledWith({
                where: { id: taskId },
            });
            expect(result).toBe(taskId); // Verifying that the returned ID is correct
        });

        it("should throw an error if task ID does not exist", async () => {
            const taskId = 999;
            (prisma.task.delete as jest.Mock).mockRejectedValue(
                new Error("Task not found")
            );

            try {
                await TodoRepository.deleteTask(taskId);
            } catch (error) {
                expect(error).toEqual(new Error("Task not found"));
            }
        });
    });

    describe("updateTask", () => {
        it("should update an existing task", async () => {
            const taskId = 1;
            const result = await TodoRepository.updateTask(taskId, mockUpdateData);

            expect(prisma.task.update).toHaveBeenCalledWith({
                where: { id: taskId },
                data: mockUpdateData,
            });

            expect(result).toEqual(mockUpdatedTask); // Verifying the updated task returned
        });

        it("should throw an error if task ID does not exist", async () => {
            const taskId = 999;
            (prisma.task.update as jest.Mock).mockRejectedValue(
                new Error("Task not found")
            );

            try {
                await TodoRepository.updateTask(taskId, mockUpdateData);
            } catch (error) {
                expect(error).toEqual(new Error("Task not found"));
            }
        });

        it("should handle partial updates (e.g., only completed field)", async () => {
            const partialUpdateData = { completed: true };
            const taskId = 1;
            const updatedTask = { id: 1, title: "Test Task", completed: true };

            (prisma.task.update as jest.Mock).mockResolvedValue(updatedTask);

            const result = await TodoRepository.updateTask(taskId, partialUpdateData);

            expect(prisma.task.update).toHaveBeenCalledWith({
                where: { id: taskId },
                data: partialUpdateData,
            });
            expect(result).toEqual(updatedTask);
        });
    });
});
