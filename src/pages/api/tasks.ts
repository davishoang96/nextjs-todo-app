import { NextApiRequest, NextApiResponse } from 'next';
import { TodoRepository } from '../../repositories/todoRepository'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Fetch all tasks from the repository
            console.log(1);
            const tasks = await TodoRepository.getAllTasks();

            // Respond with the list of tasks
            return res.status(200).json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return res.status(500).json({ error: 'Error fetching tasks' });
        }
    } else {
        // Method Not Allowed
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
