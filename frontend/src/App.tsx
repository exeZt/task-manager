import './styles/index.css';
import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import Header from './components/Header';
import type { ITask } from './types';
import Task from './components/Task';
import AppContext from './components/ctx';
import { getTaskList } from './lib/api';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

	useEffect(() => {
    getTaskList() //@ts-ignore
      .then((v: string) =>{
        setTasks(JSON.parse(v));
      })
	}, [])

  return (
    <AppContext.Provider value={{
      tasks, setTasks
    }}>
      <div className="app-container">
        <div className="app-content"> 
          <Header/>
          <TaskInput />
          <div className='tasks-list' id='tasks-list'>
            {tasks?.map((v, i) => 
              <Task task={v} key={i} />)}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
