import { useEffect, useState } from "react";
import { getData } from "./data";
import type { ITask } from "./data";

type GroupedTasks = Record<string, ITask[]>;

function groupTasksByAssigned(tasks: ITask[]): GroupedTasks{
  const grouped: GroupedTasks = {};

  for(const task of tasks) {
    const assigneeName = task.assignee ? task.assignee.firstName : "Not Assigned";
    if(!grouped[assigneeName]) grouped[assigneeName] = [];

    grouped[assigneeName].push(task);
  }

  return grouped;
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

  if(loading) {
    return <div>Getting tasks...</div>;
  }

  const groupedTasks = groupTasksByAssigned(tasks);

  return (
    <div>
      <h1>Task Board</h1>
      <p>total tasks: {tasks.length}</p>
      
      <div className="columns">
          {Object.entries(groupedTasks).map(([assignee, taskList]) => (
            <div key={assignee}>
              <h2>{assignee}</h2>
              <ul className="task-list">
                {taskList.map((task) => (
                  <li key={task.id}>
                    {task.title} {task.isCompleted ? " | done" : ""}
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