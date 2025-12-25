import { useContext, useEffect } from "react";
import type { ITask } from "../types";
import AppContext from "./ctx";
import { deleteTask } from "../lib/api";

const Task: ({ task }: { task: ITask }) => React.JSX.Element = ({ task }) => {//@ts-ignore
	useEffect(() => {
		console.log(task)
	}, [])

	const { tasks, setTasks } = useContext(AppContext);
	const DeleteTask = (task: ITask) => {
		setTasks((prev: ITask[]) => prev.filter(v => v != task));
		deleteTask(task);
	}

	return (
		<div className="task-item" key={task.id}>
			<button className="task-checkbox" aria-label="Mark as complete">
			</button>
			<div className="task-content">
				<span className="task-text">{ task.name }</span>
				<div className="task-meta">
					<div className={`task-badge priority-${task.priority}`}>
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
							<line x1="4" y1="22" x2="4" y2="15"></line>
						</svg>
						<span>{task.priority}</span>
					</div>
					{task.date.toString().length > 0 && 
					<div className="task-badge date-badge overdue">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
							<line x1="16" y1="2" x2="16" y2="6"></line>
							<line x1="8" y1="2" x2="8" y2="6"></line>
							<line x1="3" y1="10" x2="21" y2="10"></line>
						</svg>
						<span>{task.date.toString() }</span>
					</div>
					}
				</div>
			</div>

			<button className="btn-delete" aria-label="Delete task" onClick={() => DeleteTask(task)}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="3 6 5 6 21 6"></polyline>
					<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
				</svg>
			</button>
		</div>
	);
}
export default Task;