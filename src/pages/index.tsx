import { useState, useEffect } from "react";
import ListAllTask from "../components/ListAllTasks";
import CreateTaskForm from "../components/createTaskForm";
import { Task } from "@prisma/client";

const TaskManagement = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	// Fetch tasks initially when the component mounts
	useEffect(() => {
		const fetchTasks = async () => {
			const response = await fetch("/api/tasks");
			const data = await response.json();
			setTasks(data);
		};

		fetchTasks();
	}, []);

	// Function to add a new task to the list
	const addTask = (newTask: Task) => {
		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	// Function to update an existing task in the list
	const updateTask = (updatedTask: Task) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		);
	};

	const deleteAllTasks = async () => {
		const response = await fetch("/api/deleteAllTasks", {
			method: "DELETE",
		});

		if (response.ok) {
			const data = await response.json();
			alert(data.numOfTask); // Show the message with the count of deleted tasks
			setTasks([]); // Clear the task list in the state
		} else {
			alert("Error deleting tasks");
		}
	};

	return (
		<div className="container mt-5">
			<h1>Task Management</h1>
			<ListAllTask tasks={tasks} onTaskUpdate={updateTask} />
			<CreateTaskForm addTask={addTask} />
			<button className="btn btn-danger mt-3" onClick={deleteAllTasks}>
				Purge Database
			</button>
		</div>
	);
};

export default TaskManagement;
