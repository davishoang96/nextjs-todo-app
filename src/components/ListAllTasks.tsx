import { useState } from 'react';

interface Task {
	id: number;
	title: string;
	completed: boolean;
	createdAt: Date;
}

interface ListAllTaskProps {
	tasks: Task[];
	onTaskUpdate: (updatedTask: Task) => void;
	onTaskDelete: (taskId: number) => void; // New prop for task deletion
}

const ListAllTask = ({ tasks, onTaskUpdate, onTaskDelete }: ListAllTaskProps) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [title, setTitle] = useState('');
	const [completed, setCompleted] = useState(false);

	const openModal = (task: Task) => {
		setSelectedTask(task);
		setTitle(task.title);
		setCompleted(task.completed);
		setModalOpen(true);
	};

	const handleSave = async () => {
		if (selectedTask) {
			try {
				const response = await fetch(`/api/updateTask`, {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: selectedTask.id, title, completed }),
				});

				if (response.ok) {
					const updatedTask: Task = await response.json();
					onTaskUpdate(updatedTask);
					setModalOpen(false);
				} else {
					console.error('Failed to update task');
				}
			} catch (error) {
				console.error('Error updating task:', error);
			}
		}
	};

	const handleDelete = async (taskId: number) => {
		try {
			const response = await fetch(`/api/deleteTask?id=${taskId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				onTaskDelete(taskId); // Notify parent component of deletion
			} else {
				console.error('Failed to delete task');
			}
		} catch (error) {
			console.error('Error deleting task:', error);
		}
	};

	return (
		<div className="container mt-4">
			<h2>Task List</h2>
			{tasks.length === 0 ? (
				<p>No tasks available.</p>
			) : (
				<ul className="list-group">
					{tasks.map((task) => (
						<li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
							<div>
								<strong>{task.title}</strong>
								<span className={`badge ms-2 ${task.completed ? 'bg-success' : 'bg-warning'}`}>
									{task.completed ? 'Completed' : 'Pending'}
								</span>
							</div>
							<div>
								<button className="btn btn-sm btn-primary me-2" onClick={() => openModal(task)}>
									Edit
								</button>
								<button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}

			{isModalOpen && (
				<div className="modal show d-block" tabIndex={-1} role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Edit Task</h5>
								<button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
							</div>
							<div className="modal-body">
								<div className="mb-3">
									<label className="form-label">Title</label>
									<input
										type="text"
										className="form-control"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>
								<div className="form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="completedCheck"
										checked={completed}
										onChange={(e) => setCompleted(e.target.checked)}
									/>
									<label className="form-check-label" htmlFor="completedCheck">
										Completed
									</label>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
									Close
								</button>
								<button type="button" className="btn btn-primary" onClick={handleSave}>
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ListAllTask;
