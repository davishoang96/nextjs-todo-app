import { NextApiRequest, NextApiResponse } from 'next';
import { TodoRepository } from '../../repositories/todoRepository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            // Delete all tasks and get the count of deleted tasks
            const deletedCount = await TodoRepository.deleteAllTasks();

            // Respond with the number of deleted tasks
            return res.status(200).json({numOfTask: deletedCount});

        } catch (error) {
            console.error('Error deleting tasks:', error);
            return res.status(500).json({ error: 'Error deleting tasks' });
        }
    } else {
        // Method Not Allowed
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
