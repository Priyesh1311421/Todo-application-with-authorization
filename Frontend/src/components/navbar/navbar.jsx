import React from 'react'
import './navbar.css'
import { FcTodoList } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux'
import { authActions } from '../../store';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    
    const history = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();
    const logout = () => {
        sessionStorage.clear("id");
        dispatch(authActions.logout());
        history('/')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container">
                    <Link className="navbar-brand" to="/"><FcTodoList /> <b>todo</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 " >
                            <li className="nav-item mx-2">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {!isLoggedIn && 
                                <>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link active btn-nav" aria-current="page" to="/signup">SignUp</Link>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link active btn-nav" aria-current="page" to="/login">LogIn</Link>
                                    </li>
                                </>
                            }
                            <li className="nav-item mx-2">
                            <Link className="nav-link active" aria-current="page" to="/profile">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" className='usericon'/>
                            </Link>
                            </li>
                            {isLoggedIn &&
                                <>
                                    <li className="nav-item mx-2" onClick={logout}>
                                        <Link className="nav-link active btn-nav" aria-current="page" to="#">LogOut</Link>
                                    </li>
                                </>
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default React.memo(Navbar);
