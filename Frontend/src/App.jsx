import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import Home from './components/home/home'
import Footer from './components/footer/footer'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from './components/signup/signup'
import Login from './components/login/login'
import Todo from './components/todo/todo'
import { useDispatch } from 'react-redux'
import { authActions } from './store'


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const id = sessionStorage.getItem("id")
    if(id){
      dispatch(authActions.login());
    }
  },[])


  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element = {<Home/>}></Route>
          <Route path='/signup' element = {<Signup/>}></Route>
          <Route path='/login' element = {<Login/>}></Route>
          <Route path='/profile' element = {<Todo/>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
      
    </>
  )
}

export default App
