import { useContext, useRef } from "react";
import type { ITask } from "../types";
import AppContext from "./ctx";
import { createTask } from "../lib/api";

const TaskInput: () => React.JSX.Element = () => {//@ts-ignore
	const { tasks, setTasks } = useContext(AppContext);
	let nameRef = useRef(null), priorityRef = useRef(null), dateRef = useRef(null);

	const CreateTask = () => {
		if (nameRef?.current?.value?.length <= 0)
			return;

		let task = {
			id: crypto.randomUUID(),
			name: nameRef?.current!.value, // required
			date: dateRef?.current!.value, // as number not-null value
			priority: priorityRef?.current!.value, // string & required (bcs default v exists)
			completed: false // 0 | 1 in data
		} as ITask
		setTasks((prev: ITask[]) => [...prev, task]);
		createTask(task);
	}

	return (
		<form className="task-input-form" id="task-form" onSubmit={(ev) => {ev.preventDefault(); return false}}>
			<input
				type="text"
				ref={nameRef}
				id="task-input"
				pattern="{1,}"
				placeholder="Add a new task..."
				className="task-input-text"
			/>

			<div className="task-input-controls">
				<div className="input-group">
					<label className="input-label">Priority:</label>
					<select id="priority-select" ref={priorityRef} className="input-select">
						<option value="low">Low</option>
						<option value="medium" selected>Medium</option>
						<option value="high">High</option>
					</select>
				</div>

				<div className="input-group">
					<svg className="calendar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
						<line x1="16" y1="2" x2="16" y2="6"></line>
						<line x1="8" y1="2" x2="8" y2="6"></line>
						<line x1="3" y1="10" x2="21" y2="10"></line>
					</svg>
					<input
						ref={dateRef}
						type="date"
						id="date-input"
						className="input-date"
					/>
				</div>

				<button type="submit" className="btn-add" onClick={CreateTask}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="12" y1="5" x2="12" y2="19"></line>
						<line x1="5" y1="12" x2="19" y2="12"></line>
					</svg>
					Add
				</button>
			</div>
		</form>
	);
}

export default TaskInput;