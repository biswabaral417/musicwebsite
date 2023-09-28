import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import MusicContext from '../contexts/MusicContext';

export default function Login() {
    const { userEmail, setUserEmail, userPassword, setUserPassword, PostData_Login } = useContext(MusicContext)

    const togPass = () => {
        if (document.getElementById('InputPassword').type === "password") {
            document.getElementById('InputPassword').setAttribute("type", "text");
            document.querySelector('.togp-btn').querySelector("img").setAttribute("src", "../images/eye-fill.svg")
        }
        else {
            document.getElementById('InputPassword').setAttribute("type", "password");
            document.querySelector('.togp-btn').querySelector("img").setAttribute("src", "../images/eye-slash-fill.svg")
        }
    }

    return (
        <div className='access-container container p-5'>
            <div className='Login-Modal-Container rounded p-3'>
                <h1 className='text-center text-white'>Log in</h1>
                <div className='my-5'>
                    <form method="POST" >
                        <div>
                            <div className="mb-3">
                                <label htmlFor="InputEmail" className="form-label text-white">Email address</label>
                                <input type="email" className="form-control" id="InputEmail" onChange={(e) => setUserEmail(e.target.value)} value={userEmail} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
                                <div className='d-flex'>
                                    <input type="password" autoComplete='off' onChange={(e) => setUserPassword(e.target.value)} value={userPassword} className="form-control" id="InputPassword" />
                                    <button className='d-flex togp-btn mx-2' onClick={() => togPass()} type='button'><img src="../images/eye-slash-fill.svg" alt="" /></button>
                                </div>
                            </div>
                        </div>
                        <div className='my-4'>
                            <button id="loginbtn" onClick={PostData_Login} className="btn btn-warning">Login</button>
                        </div>
                    </form>
                    <p className='text-center mt-3  text-white'>don't have a account?
                        <NavLink to='/signup'>
                            <button className='btn btn-warning mx-3'>create one</button>
                        </NavLink>
                    </p>
                </div>
            </div>

        </div>
    )
}
