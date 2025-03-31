import React, { useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../store/UserSlice';
import { FaAngleDown,FaAngleUp } from "react-icons/fa";
import UserMenu from './UserMenu';

const Header = () => {
    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state)=>state?.user)
    const navigate = useNavigate()
    console.log(user)
  return (
    <header className='h-24 lg:shadow-md sticky top-0 bg-white'>
        <div className='container mx-auto flex items-center lg:h-full px-4 justify-between'>

            <div className='h-full'>
                <Link to={"/"} className='h-full flex justify-center items-center'>
                    <img src={logo} alt="logo" width={170} height={60} />
                </Link>
            </div>

            <div className='hidden lg:block'>
                <Search></Search>
            </div>

            <div className='flex items-center justify-center'>
                <button className='text-neutral-600 lg:hidden relative' onClick={()=>{ !user._id ?  navigate('/login') : setOpen(!open)}} >
                    <FaRegUserCircle size={26} />
                    {open ? 
                        <div className='absolute right-0 bg-white shadow-lg top-10 min-w-[200px] p-2'>
                            <UserMenu></UserMenu> 
                        </div>
                    : <></>} 
                </button>
                <div className='hidden lg:flex items-center gap-5'>
                    {user._id ? 
                        <div className='relative '>
                            <div className='cursor-pointer flex gap-2 items-center bg-slate-200 p-4' onClick={()=>setOpen(!open)}>
                                Account
                                {open ? <FaAngleUp></FaAngleUp> : <FaAngleDown></FaAngleDown>}    
                            </div>
                            {open ? 
                            <div className='absolute right-0 bg-white shadow-lg top-18 min-w-[200px] p-2'>
                                <UserMenu></UserMenu> 
                            </div>
                            : <></>}
                            
                        </div> 
                        : 
                        <Link to={"/login"} >Login</Link>}
                    

                    <button className='flex cursor-pointer relative items-center gap-4 bg-green-500 hover:bg-green-700 rounded-md py-3 px-3 text-white '>
                        <div className='animate-bounce'>
                            <IoCartOutline size={35}/>
                        </div>
                        <div>
                            <p>My Cart</p>
                        </div>
                    </button>
                </div>
            </div>


        </div>
        <div className='lg:hidden container mx-auto px-4'>
                <Search></Search>
            </div>
    </header>
  )
}

export default Header
