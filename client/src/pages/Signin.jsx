import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

function Signin() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }
    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                console.log("this is data message", data.message);
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            dispatch(signInFailure(data.message));
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Signin</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="text" className='border p-3 rounded-lg focus:outline-none' id='email' name='email' onChange={handleChange} placeholder='username/email' />
                <input type="password" className='border p-3 rounded-lg focus:outline-none' id='password' name='password' onChange={handleChange} placeholder='password' />
                <button disabled={loading} type='sumbit' className='disabled bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                    {loading ? "Loading..." : "Sign In"}
                </button>
                <OAuth />
            </form>

            <div className='flex gap-2 py-3'>
                <p>Create new account.!</p>
                <Link to={"/signup"} >
                    <span className='text-blue-700'>Sign Up</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default Signin
