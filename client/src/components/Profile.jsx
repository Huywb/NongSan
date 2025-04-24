import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxAvatar } from "react-icons/rx";
import { BaseURL } from '../libs/APIcustom';
import toast from 'react-hot-toast';
import { AiOutlineLoading } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { setUserDetails } from '../store/UserSlice';

const Profile = () => {
    const user = useSelector((state)=>state.user)
    console.log(user)
    const dispatch = useDispatch()
    const [visible,setVisible] = useState({
            password: false,
            password_confirm: false
        })
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({
        avatar: '',
        name: '',
        email: '',
        mobile :'',
        password: '',
        confirm_password: ''
    })

    const handleChange = (e)=>{
        setData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    useEffect(()=>{
        setData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            avatar: user.avatar,
            password: "",
            confirm_password: ""
        })      
    },[user])
    
    const handleSubmit = async(e)=>{
        
        e.preventDefault()

        if(!data.password || !data.confirm_password){
            toast.error("Password and comfirm password not empty")
        }else if(data.password !== data.confirm_password){
            toast.error("Password and confirm password not a same")
        }else{
            const res = await fetch(`${BaseURL}/user/update`,{
                method: "PUT",
                headers:{
                    "Content-type": "application/json"  
                },
                body: JSON.stringify(data),
                credentials: "include"
            })
    
            const result = await res.json()
    
            if(result.success){
                toast.success("Update success")
                console.log(result)
                dispatch(setUserDetails(result.data))
            }else{
                toast.error("Something wrong when update !!!")
            }

        }
        
    }

    const handleUploadAvatar = async (e)=>{
        const file = e.target.files[0]
        setLoading(true)
        const formData = new FormData()
        formData.append('avatar',file)

        const res = await fetch(`${BaseURL}/user/upload-avatar`,{
            method: "PUT",
            body: formData,
            credentials: "include"
        })

        const data = await res.json()

        if(data.success == true){
            toast.success("Upload avatar success")
            console.log('data',data)
            setData((prev)=>({...prev, avatar: data.data.avatar }));
            setLoading(false)
        }else{
            toast.error(data.error)
            setLoading(false)
        }
        
    }

    console.log(data)

  return (
    <div className='flex p-8 items-center gap-8'>
        <div className='flex flex-col gap-2 items-center w-[30%] h-[100px]'>
            {user.avatar? 
                <img src={data.avatar ? data.avatar : user.avatar} className='w-full h-full overflow-hidden rounded-full'></img>
            :
                <RxAvatar size={50}/>
            }
            <label className='w-20 hover:border-amber-300 rounded-md drop-shadow-md border cursor-pointer flex items-center justify-center'>{loading ? <AiOutlineLoading  className='animate-spin'/> : "Edit" }<input type='file' className='hidden' onChange={handleUploadAvatar}></input></label>
        </div>

        <form className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Name :</label>
                <input type="text" value={data.name} name='name' onChange={handleChange} placeholder='Enter your name' className='w-full outline-none  border focus-within:border-amber-300 bg-blue-50 p-2 rounded-md'/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Email :</label>
                <input type="email" value={data.email} name='email' onChange={handleChange} placeholder='Enter your email' className='w-full outline-none  border focus-within:border-amber-300 bg-blue-50 p-2 rounded-md'/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="">Mobile :</label>
                <input type="text" value={data.mobile} name='mobile' onChange={handleChange} placeholder='Enter your mobile' className='w-full outline-none  border focus-within:border-amber-300 bg-blue-50 p-2 rounded-md'/>
            </div>
            <div className='flex flex-col gap-1 relative'>
                <label htmlFor="">Password :</label>
                <input type={visible.password ? "text" : "password"} name='password' onChange={handleChange} value={data.password} placeholder='Enter your password' className='w-full outline-none  border focus-within:border-amber-300 bg-blue-50 p-2 rounded-md'/>
                <div className='absolute right-3 bottom-2 cursor-pointer' onClick={()=>setVisible((prev)=>({...prev,password : !prev.password}))}>
                    {visible.password ? <BsEye size={26}></BsEye> :  <BsEyeSlash size={26}></BsEyeSlash>}
                </div>
            </div>
            <div className='flex flex-col gap-1 relative'>
                <label htmlFor="">Confirm Password :</label>
                <input type={visible.password_confirm ? "text" : "password"} name='confirm_password' onChange={handleChange} value={data.confirm_password} placeholder='Enter your password' className='w-full outline-none  border focus-within:border-amber-300 bg-blue-50 p-2 rounded-md'/>
                <div className='absolute right-3 bottom-2 cursor-pointer' onClick={()=>setVisible((prev)=>({...prev,password_confirm : !prev.password_confirm}))}>
                    {visible.password_confirm ? <BsEye size={26}></BsEye> :  <BsEyeSlash size={26}></BsEyeSlash>}
                </div>
            </div>
            <button onClick={handleSubmit} className='w-full p-2 bg-green-600 transition duration-300 mt-4 cursor-pointer rounded-md hover:bg-green-400 hover:text-white'>Submit</button>
        </form>
    </div>
  )
}

export default Profile
