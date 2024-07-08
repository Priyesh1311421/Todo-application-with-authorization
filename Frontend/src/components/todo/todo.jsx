import React, { useEffect, useState } from 'react';
import './todo.css';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './update';
import axios from 'axios';

const Todo = () => {
    const [Input, setInput] = useState({ title: '', description: '' });
    const [Array, setArray] = useState([]);
    const id = sessionStorage.getItem("id");

    const change = (e) => {
        const { name, value } = e.target;
        setInput({ ...Input, [name]: value });
    }

    const submit = async () => {
        if (Input.title === '' || Input.description === '') {
            toast.error('Title or Description missing');
            return;
        }

        if (id) {
            try {
                await axios.post(`http://localhost:3000/todo/addTask`, { title: Input.title, description: Input.description, id: id });
                setInput({ title: '', description: '' });
                toast.success("Your task is added");
            } catch (error) {
                toast.error("Failed to add task");
            }
        } else {
            setArray([...Array, Input]);
            setInput({ title: '', description: '' });
            toast.success("Your task is added");
            toast.error("Your task is not saved! Please SignUp");
        }
    }

    const del = async (Cardid) => {
        if(id){
            try {
                await axios.delete(`http://localhost:3000/todo/deleteTask/${Cardid}`, { data: { id: id } });
                setArray(Array.filter(item => item._id !== Cardid));
                toast.success("Your task deleted");
            } catch (error) {
                toast.error("Failed to delete task");
            }
        }else{
            toast.error("Please SignUp first")
        }
    }

    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/todo/getTasks/${id}`);
                setArray(response.data.todo);
            } catch (error) {
                toast.error("Failed to fetch tasks");
            }
        }
        if (id) {
            fetchTasks();
        }
    }, [id,submit]);

    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column'>
                    <div className='d-flex flex-column todo-inputs-div w-75 p-1'>
                        <input
                            type='text'
                            name='title'
                            placeholder='Title'
                            onChange={change}
                            value={Input.title}
                            className='my-2 p-2 todo-input'
                            required
                        />
                        <textarea
                            type='text'
                            name='description'
                            placeholder='Description'
                            value={Input.description}
                            onChange={change}
                            className='p-2 todo-input' />
                    </div>
                    <div className='w-75 d-flex justify-content-end'>
                        <button className='home-btn' onClick={submit}>
                            Add Todo
                        </button>
                    </div>
                </div>
                <div className='todo-body'>
                    <div className='container-fluid'>
                        <div className='row '>
                            {Array &&
                                Array.map((item, index) => (
                                <div className='col-lg-3 col-10 mx-5 my-2 ' key={index}>
                                    <TodoCards
                                        title={item.title}
                                        description={item.description}
                                        id={item._id}
                                        delid={del}
                                        display={dis}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='todo-update' id='todo-update'>
                <div className='container update'>
                    <Update display={dis} />
                </div>
            </div>
        </>
    )
}

export default Todo;
