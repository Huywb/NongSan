import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BaseURL } from '../libs/APIcustom';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate()
    const [visible,setVisible] = useState({
        password: false,
        password_confirm: false
    })
    const [value,setValue] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    })

    const handleChange = (e)=>{
        setValue((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit =async (e)=>{
        e.preventDefault()
        if(value.password !== value.password_confirm){
            toast.error("Paddword and password confirm not same !!!!!")
        }else{
            console.log(value)
            const res = await fetch(`${BaseURL}/user/register`,{
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                },
                body: JSON.stringify(value)
            })
            const data = await res.json()

            console.log(data)

            if(data.success == false){
                if(data.message){
                    toast.error(data.message)
                }else{
                    toast.error("Cannot create a Account")
                }
            }else{
                setValue({
                    name: '',
                    email: '',
                    password: '',
                    password_confirm: ''
                })
                toast.success("Register success !!!")
                navigate('/login')
            }
        }
    }

    const validateValue = Object.values(value).every(el=>el)
  return (
    <section className='w-full h-screen container mx-auto p-6 '>
        <div className='lg:w-[40%] w-[60%] mx-auto p-4 mt-4 bg-white'>
            <p className='flex items-center justify-center text-3xl'>Welcome to BKB</p>

            <form className='grid gap-4 mt-6'>
                <div className='grid gap-2'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" placeholder='Enter your name' autoFocus className='bg-blue-50 p-2 rounded-md focus:border outline-none focus:border-amber-300' name='name' value={value.name} onChange={handleChange} />
                </div>
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
                <div className='grid gap-2 relative'>
                    <label htmlFor="password_confirm">Password Confirm:</label>
                    <input type={visible.password_confirm ? "text" : "password"} placeholder='************' autoFocus className='bg-blue-50 p-2 rounded-md focus:border outline-none focus:border-amber-300' name='password_confirm' value={value.password_confirm} onChange={handleChange} />
                    <div className='absolute bottom-2 right-2 cursor-pointer ' onClick={(e)=>setVisible((prev)=>({...prev,password_confirm : !prev.password_confirm}))}>
                        {visible.password_confirm ? <BsEyeSlash size={26}/> :<BsEye size={26}/> }
                    </div>
                </div>
                <button disabled={!validateValue} className={`${validateValue ? "bg-green-500 cursor-pointer hover:bg-green-400 transition duration-300" :"bg-gray-600 cursor-not-allowed"} p-2 text-white text-2xl font-semibold rounded-md`} onClick={handleSubmit}>Submit</button>
                <p>Already have a account !<Link to={'/login'} className='font-semibold hover:underline'>Login</Link></p>
            </form>

        </div>
    </section>
  )
}

export default Register
