import { useEffect, useMemo, useState } from "react";
import { getData } from "./data";
import type { ITask } from "./data";
import "./App.css";

type GroupedTasks = Record<string, ITask[]>;

function groupTasksByAssigned(tasks: ITask[]): GroupedTasks{
  const grouped: GroupedTasks = {};

  for(const task of tasks) {
    const assigneeName = task.assignee ? task.assignee.id : "Not Assigned";
    if(!grouped[assigneeName]) grouped[assigneeName] = [];

    grouped[assigneeName].push(task);
  }

  return grouped;
}

//sort by completion and then alphabetically
function sortTasksByCompletion(tasks: ITask[]): ITask[] {
  return tasks.slice().sort((a, b) => {
    if(a.isCompleted === b.isCompleted){
      return a.title.localeCompare(b.title);
    }
    return a.isCompleted ? 1 : -1;
  });
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function load() {
      const data = await getData();
      setTasks(data);
      setLoading(false);
    }

    load();
  }, []);
  
  const groupedTasks = useMemo(() => groupTasksByAssigned(tasks), [tasks]);

  if(loading) {
    return <div className="loading">Getting tasks...</div>;
  }

  return (
    <div className="app">
      <h1>Task Board</h1>
      <p>total tasks: {tasks.length}</p>
      
      <div className="columns">
          {Object.entries(groupedTasks).map(([assignee, taskList]) => (
            <div key={assignee} className="assignee-box">
              <h2>{taskList[0].assignee?.firstName ?? "Not Assigned"} ({taskList.filter(t => !t.isCompleted).length}/{taskList.length} remaining)</h2>
              <ul className="task-list">
                {sortTasksByCompletion(taskList).map((task) => (
                  <li key={task.id} className={`task-item ${task.isCompleted ? "completed" : ""}`}>
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
        ))}
      </div>

    </div>

  );
}

export default App;