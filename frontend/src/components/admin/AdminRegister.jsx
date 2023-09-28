import React from 'react'
import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function AdminRegister() {
    const navigate = useNavigate();
    const [rUserData, setRUserData] = useState({ userName: "", userPhone: "", userEmail: "", userPassword: "", userConfirmPassword: "" });

    let feildId;
    let value;
    const removeWarning = () => {
        document.getElementById("cbwarning").textContent = ""
    }
    const handleInputs = (e) => {
        feildId = e.target.id;
        value = e.target.value;
        setRUserData({ ...rUserData, [feildId]: value })
        console.log(rUserData);
    }
    const registerAdmin = async (e) => {
        e.preventDefault()
        // console.log((document.getElementById('flexCheckChecked').checked))
        if ((document.getElementById('flexCheckChecked')).checked) {
            const { userName, userPhone, userEmail, userPassword, userConfirmPassword, } = rUserData;
            // console.log({ rUserData })
            const res = await fetch('/bend/admins/register', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName, userPhone, userEmail, userPassword, userConfirmPassword })
            });

            const data = await res.json();
            console.log("eafasf")
            console.log(res.json)
            console.log(data)
            console.log(data.error)
            if (res.status === 422 || !data) {
                window.alert(data.error);
                console.log(data.error);
            }
            else if (res.status === 201) {
                navigate('/login')
                window.alert(data.sucess);
                console.log(data.sucess);


            }
            else if (res.status === 500) {
                window.alert(data.failed);
                console.log(data.failed);
            }
            else {
                window.alert("connection error")
            }

        }
        else {
            document.getElementById("cbwarning").textContent = `"check this box to continue"`
        }
    }






    const togPass = () => {
        if (document.getElementById('userPassword').type === "password") {
            document.getElementById('userPassword').setAttribute("type", "text");
            document.getElementById('userConfirmPassword').setAttribute("type", "text");
            document.querySelector('.togp-btn').querySelector("img").setAttribute("src", "../images/eye-fill.svg")
        }
        else {
            document.getElementById('userPassword').setAttribute("type", "password");
            document.querySelector('.togp-btn').querySelector("img").setAttribute("src", "../images/eye-slash-fill.svg")
            document.getElementById('userConfirmPassword').setAttribute("type", "password");
        }
    }
    return (
        <div className='container access-container p-5'>
            <div>

                <h1>apply for admin</h1>
                <form method='post'>
                    <label htmlFor="userName" className="form-label">Name</label>
                    <input value={rUserData.userName} onChange={handleInputs} type="text" id='userName' className='form-control my-2' />
                    <div className="mb-3 d-flex flex-wrap gap-1">
                        <div>

                            <label htmlFor="userPhone" className="form-label">Phone Number</label>
                            <input value={rUserData.userPhone} onChange={handleInputs} type="text" className="form-control" id="userPhone" aria-describedby="phoneHelp" />
                        </div>
                        <div>
                            <label htmlFor="userEmail" className="form-label">Email Address</label>
                            <input value={rUserData.userEmail} onChange={handleInputs} type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" />
                        </div>
                    </div>

                    <div className="mb-3">

                        <label htmlFor="userPassword" className="form-label">Create password</label>
                        <input value={rUserData.userPassword} onChange={handleInputs} type="password" className="form-control  " id="userPassword" />

                        <div className='my-3'>
                            <label htmlFor="userPassword" className="form-label">Re-type Password</label>
                            <div className='d-flex'>
                                <input value={rUserData.userConfirmPassword} onChange={handleInputs} type="password" className="form-control my-2" id="userConfirmPassword" />
                                <button className='m-2 togp-btn d-flex align-items-center' onClick={() => togPass()} type='button'>&nbsp;<img src="../images/eye-slash-fill.svg" alt="" /></button>
                            </div>
                        </div>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label text-white" id="chk" htmlFor="flexCheckChecked">
                            <input className="form-check-input d-flex" type="checkbox" onChange={removeWarning} id="flexCheckChecked" required />
                            Agree Terms and Conditions<i id="cbwarning" className='mx-3 text-danger text-italic'></i>
                        </label>
                    </div>
                    <button className="btn btn-warning" onClick={registerAdmin} >Create Account</button>
                </form>
            </div>
        </div>
    )
}
