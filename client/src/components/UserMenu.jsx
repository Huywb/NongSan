import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setLogout } from '../store/UserSlice'
import { BaseURL } from '../libs/APIcustom'
import toast from 'react-hot-toast'
import { IoIosSettings } from "react-icons/io";

const UserMenu = () => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    console.log(user)

    const handleLogOut = async()=>{
        const res = await fetch(`${BaseURL}/user/logout`,{
            method:"POST",
            headers: {
                "Content-type": 'application/json'
            },
            credentials: 'include'
        })

        const data = await res.json()
        if(data){
            dispatch(setLogout())
            toast.success("Logout success")
        }else{
            toast.error("Something wrong when logout")
        }
    }
  return (
    <div className='flex flex-col'>
        <div className='text-lg'>My Account</div>
        <div className='flex gap-2 items-center justify-center lg:justify-start '> <span>{user?.name}</span> <Link to={'/dashboard/profile'} className='opacity-70 hover:opacity-100 transition duration-300 '><IoIosSettings /></Link></div>
        <span className='border-b-2 opacity-50'></span>
        <div className='flex flex-col text-md py-2'>
            {user.role !== "USER" 
            ? <>
                <Link to={'/dashboard/category'} className='hover:bg-slate-200 hover:opacity-100 py-1 transition duration-300 opacity-70' >Category</Link>
                <Link to={'/dashboard/product'} className='hover:bg-slate-200 hover:opacity-100 py-1 transition duration-300 opacity-70' >Upload Product</Link>
                <Link to={'/dashboard/upload-product'} className='hover:bg-slate-200 hover:opacity-100 py-1 transition duration-300 opacity-70' >Product</Link>
            </>
            :
            <>
                </>
            }
            <Link to={'/dashboard/myorders'} className='hover:bg-slate-200 hover:opacity-100 py-1 transition duration-300 opacity-70' >My Orders</Link>
            <Link to={'/dashboard/address'}  className='hover:bg-slate-200 hover:opacity-100 py-1 transition duration-300 opacity-70'>Save Address</Link> 
            
        </div>
        <span className='border-b-2 opacity-50'></span>

        <div onClick={()=>handleLogOut()} className='hover:bg-slate-200 cursor-pointer opacity-70 hover:opacity-100 transition duration-300'>Log Out</div>

    </div>
  )
}

export default UserMenu
