import { useState, useEffect } from 'react';
import ListAllTask from '../components/ListAllTasks';
import CreateTaskForm from '../components/createTaskForm';
import { Task } from "@prisma/client";

const TaskManagement = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Fetch tasks initially when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks');
            const data = await response.json();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    // Function to add a new task to the list
    const addTask = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return (
        <div className="container mt-5">
            <h1>Task Management</h1>
            <ListAllTask tasks={tasks} />
            <CreateTaskForm addTask={addTask} />
        </div>
    );
};

export default TaskManagement;
