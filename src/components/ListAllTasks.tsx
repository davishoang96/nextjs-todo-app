interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface ListAllTaskProps {
    tasks: Task[];
}

const ListAllTask = ({ tasks }: ListAllTaskProps) => {
    return (
        <div className="container mt-4">
            <h2>Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul className="list-group">
                    {tasks.map((task) => (
                        <li key={task.id} className="list-group-item">
                            <strong>{task.title}</strong>
                            <span className="badge bg-success ms-2">
                                {task.completed ? 'Completed' : 'Pending'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListAllTask;
