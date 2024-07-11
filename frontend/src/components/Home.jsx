import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Home = () => {

  const {isAuthenticated} = useContext(Context);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/v1/tasks/mytasks',
        {
          withCredentials: true
        }
       );
       setTasks(data.tasks);
    } catch (error) {
      setTasks([]);
    }
  }

  const createTask = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/tasks/newtask', 
        {title, description}, 
        {
          withCredentials: true,
          headers: { "Content-Type" : "application/json"},
        }

      );

      toast.success(data.message);
      getAllTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/tasks/deletetask/${id}`,  
        {
          withCredentials: true,
        }

      );

      toast.success(data.message);
      getAllTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const updateTask = async (id) => {
    const updatedTask = tasks.find((task) => task._id === id);
    await axios.put(
      `http://localhost:4000/api/v1/tasks/updatetask/${id}`,
      updatedTask,
      {
        withCredentials: true,
      }
    ).then((res)=>{
      toast.success(res.data.message);
    }).catch(error=>{
      toast.error(error.response.data.message);
    })
  };

  const handleInputChange = (taskId, field, value) => {
    setTasks(prevTasks=>
      prevTasks.map((task)=>
        task._id === taskId ? { ...task, [field]: value } : task
      )
    );
  };

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login');
    }
    getAllTasks();
  },[isAuthenticated, navigate]);

  
  return (
    <section className='home'>
        <h1>CREATE YOUR TASK</h1>
        <div className='create-task'>
          <input 
            type="text" 
            placeholder='Your Task Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea 
            placeholder="Your task Description"
            value={description}
            rows={10}
            onChange={(e) => setDescription(e.target.value)}  
          />
          <button onClick={() => createTask()}>Create Task</button>
        </div>

        <div className='tasks'>
          {
            tasks && tasks.length > 0 ? (
              tasks.map(element => {
                return (
                  <div className='card' key={element._id}>
                    <input 
                      type="text"
                      value={element.title}
                      onChange={(e) => handleInputChange(element._id, "title", e.target.value)}
                    />
                    <textarea
                      rows={5}
                      value={element.description}
                      onChange={(e) => handleInputChange(element._id, "description", e.target.value)}
                    >
                      {element.description}
                    </textarea>
                    <div>
                      <button onClick={() => deleteTask(element._id)}>Delete</button>
                      <button onClick={() => updateTask(element._id)}>Update</button>
                    </div>
                  </div>
                );
              })
            ) : (<h1>You do not have any tasks</h1>)
          }
        </div>
    </section>
  )
}

export default Home