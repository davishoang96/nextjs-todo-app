import { NextApiRequest, NextApiResponse } from 'next';
import { TodoRepository, CreateTaskData } from '../../repositories/todoRepository'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { title, completed }: CreateTaskData = req.body;

            if (!title) {
                return res.status(400).json({ error: 'Title is required' });
            }

            const newTask = await TodoRepository.createTask({ title, completed });

            return res.status(201).json(newTask);
        } 
        catch (error) 
        {
            console.error('Error creating task:', error);
            return res.status(500).json({ error: 'Error creating task' });
        }
    } else {
        // Method Not Allowed
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}