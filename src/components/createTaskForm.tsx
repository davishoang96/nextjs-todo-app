import { useState } from 'react';
import { Task } from "@prisma/client";

interface CreateTaskFormProps {
    addTask: (newTask: Task) => void;
}

const CreateTaskForm = ({ addTask }: CreateTaskFormProps) => {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage('');

        const response = await fetch('/api/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, completed }),
        });

        const result = await response.json();
        if (response.ok) {
            addTask(result);  // Pass the new task to the parent component
            setMessage('Task created successfully!');
        } else {
            setMessage(`Error: ${result.error}`);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-check mb-3">
                    <input
                        id="completed"
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        className="form-check-input"
                    />
                    <label htmlFor="completed" className="form-check-label">Completed</label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Task
                </button>
            </form>

            {message && <div className="alert mt-3" role="alert">
                {message}
            </div>}
        </div>
    );
};

export default CreateTaskForm;
