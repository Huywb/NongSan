import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BaseURL } from '../libs/APIcustom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/UserSlice';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [visible,setVisible] = useState(false)
    const [value,setValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e)=>{
        setValue((prev)=>({...prev,[e.target.name]:e.target.value}))
    }


    const handleSubmit =async (e)=>{
        e.preventDefault()
        
        console.log(value)
        const res = await fetch(`${BaseURL}/user/login`,{
            method: "POST",
            headers: {
                "Content-type" : "application/json",
            },
            credentials: "include",
            body: JSON.stringify(value)
        })
        const data = await res.json()

        console.log('data',data)

        if(data.success == false){
            if(data.message){
                toast.error(data.message)
            }else{
                toast.error("Cannot Login a Account")}
            }
        else if(data.data.usercheck.status == "Inactive"){
            data.success = false
            toast.error("Account have been ban")
        }else{
            console.log(data)
            dispatch(setUserDetails(data.data.usercheck))
            setValue({
                email: '',
                password: ''
            })
            toast.success("Login success !!!")   
            navigate('/')
        }
    }

    const validateValue = Object.values(value).every(el=>el)
  return (
    <section className='w-full h-screen container mx-auto p-6 '>
        <div className='lg:w-[40%] w-[60%] mx-auto p-4 mt-4 bg-white'>
            <p className='flex items-center justify-center text-3xl'>Welcome to BKB</p>

            <form className='grid gap-4 mt-6'>
                <div className='grid gap-2'>
                    <label htmlFor="email">Email:</label>
                    <input type="text" placeholder='Example@gmail.com' autoFocus className='bg-blue-50 p-2 rounded-md focus:border outline-none focus:border-amber-300' name='email' value={value.email} onChange={handleChange} />
                </div>
                <div className='grid gap-2 relative'>
                    <label htmlFor="password">Password:</label>
                    <input type={visible.password ? "text" : "password"} placeholder='************' autoFocus className='bg-blue-50 p-2 rounded-md focus:border outline-none focus:border-amber-300' name='password' value={value.password} onChange={handleChange} />
                    <div className='absolute bottom-2 right-2 cursor-pointer ' onClick={(e)=>setVisible((prev)=>({...prev,password : !prev.password}))}>
                        {visible.password ? <BsEyeSlash size={26}/> :<BsEye size={26}/> }
                    </div>
                </div>
                <button disabled={!validateValue} className={`${validateValue ? "bg-green-500 cursor-pointer hover:bg-green-400 transition duration-300" :"bg-gray-600 cursor-not-allowed"} p-2 text-white text-2xl font-semibold rounded-md`} onClick={handleSubmit}>Login</button>
                <p>Not have a account !<Link to={'/register'} className='font-semibold hover:underline '>Register</Link></p>
            </form>

        </div>
    </section>
  )
}

export default Login
