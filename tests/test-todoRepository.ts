import {
  TodoRepository,
  CreateTaskData,
} from "../src/repositories/todoRepository";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe("TodoRepository", () => {
  describe("createTask", () => {
    it("should create a new task", async () => {
      const mockData: CreateTaskData = { title: "Test Task" };
      const mockTodo = { id: 1, title: "Test Task", completed: false };

      (prisma.task.create as jest.Mock).mockResolvedValue(mockTodo);

      const result = await TodoRepository.createTask(mockData);

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: { title: "Test Task", completed: false },
      });
      expect(result).toEqual(mockTodo);
    });
  });
});
