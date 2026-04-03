import { useEffect, useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Fetch tasks on load
  const fetchTasks = () => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching:", err));
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!input) return;
    await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input }),
    });
    setInput('');
    fetchTasks(); // Refresh the list
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Architect Task Manager 🐳</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new task..."
          style={{ padding: '10px', width: '250px' }}
        />
        <button onClick={addTask} style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer', backgroundColor: '#2496ed', color: 'white', border: 'none' }}>
          Add Task
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ background: '#eee', margin: '5px auto', padding: '10px', width: '300px', borderRadius: '5px' }}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
