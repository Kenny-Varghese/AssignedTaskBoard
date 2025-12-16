import { useEffect, useState } from "react";
import { getData } from "./data";
import type { ITask } from "./data";

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


  return (
    <div>
      <h1>Task Board</h1>
      <p>total tasks: {tasks.length}</p>
    </div>

  );
}

export default App;