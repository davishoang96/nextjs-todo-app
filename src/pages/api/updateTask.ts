import { NextApiRequest, NextApiResponse } from 'next';
import { TodoRepository } from '../../../src/repositories/todoRepository';

// Define the data structure for updating a task
interface UpdateTaskData {
    title?: string;
    completed?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Ensure the request is a PATCH method
    if (req.method === 'PATCH') {
        const { id, title, completed } = req.body;

        // Validate `id` to make sure it's a number
        if (typeof id !== 'number') {
            return res.status(400).json({ error: 'Invalid or missing task ID' });
        }

        const updateData: UpdateTaskData = { title, completed };

        try {
            // Update the task using the repository method
            const updatedTask = await TodoRepository.updateTask(id, updateData);

            return res.status(200).json(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
            return res.status(500).json({ error: 'Failed to update task' });
        }
    } else {
        // Method not allowed
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}