import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TodoCards = ({title,description,id,delid,display}) => {
  return (
    <div className='p-3 todo-card'>
        <div>
            <h4>{title}</h4>
            <p>{description.split("",50)}...</p>
        </div>
        <div className='d-flex justify-content-between'>
            <div 
                className='d-flex justify-content-center align-items-center todo-icon' 
                onClick={()=>{
                    display("Block");
                }}
            >
                <GrUpdate className='todo-icons'/> Update
            </div>
            <div className='d-flex justify-content-center align-items-center todo-icon'onClick={()=>{
                delid(id);
            }} >
                <MdDeleteForever className='todo-icons' /> Delete
            </div>
            
        </div>
    </div>
  )
}

export default TodoCards;