import React from 'react'
import './home.css'

const Home = React.memo(
  () => {
    return (
      <div className='home d-flex justify-content-center align-items-center'>
          <div className='container d-flex justify-content-center align-items-center flex-column'>
              <h1 className='text-center'>Organize your <br/>
                  work and life, Daily.
              </h1>
              <p>
                  Become focused, orgainzed, and calm with <br/> todo app. The World's <b>#1</b> task manager app.
              </p>
              <button className='home-btn p-2'>Make Todo List</button>
          </div>
      </div>
    )
  }
)

export default Home;