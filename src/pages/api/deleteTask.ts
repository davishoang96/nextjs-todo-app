import { NextApiRequest, NextApiResponse } from 'next';
import { TodoRepository } from '../../repositories/todoRepository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { id } = req.query; 

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        try {
            const returnId = await TodoRepository.deleteTask(Number(id));
            return res.status(200).json({ returnId });
        } catch (error) {
            console.error('Error deleting task:', error);
            return res.status(500).json({ error: 'Error deleting task' });
        }
    } else {
        // Method Not Allowed
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
