import type { ITask } from "../types";

//Isolated API as module

export const deleteTask = (task: ITask) => {
  const xhr = new XMLHttpRequest();
  const uri = import.meta.env.VITE_BASE_URL + '/task/delete'

  xhr.open("post", uri, true);
  xhr.setRequestHeader("Content-Type", "application/json")
  return new Promise(() => {
    xhr.send(JSON.stringify({ id: task.id }));
  });
}

export const createTask = (task: ITask) => {
  const xhr = new XMLHttpRequest();
  const uri = import.meta.env.VITE_BASE_URL + '/task/create'

  xhr.open("post", uri, true);
  xhr.setRequestHeader("Content-Type", "application/json")
  return new Promise(() => {
    xhr.send(JSON.stringify(task));
  });
}

export const getTaskList = (): Promise<string> => {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    const uri = import.meta.env.VITE_BASE_URL + '/task'

    xhr.open("get", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      res(JSON.parse(xhr.responseText));
    }
    xhr.send();
  });
}