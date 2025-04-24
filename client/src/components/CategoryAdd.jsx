import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { CiBookmarkRemove } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";
import toast from 'react-hot-toast';
import { BaseURL } from '../libs/APIcustom';

const CategoryAdd = ({close}) => {
    const [data,setData] = useState({
        name: "",
        image: []
    })

    const handleFile = (e)=>{
        if(e.target.files.length === 0) return

        setData((prev)=>({
            ...prev,
            image: [...prev.image,...e.target.files]
        }))
    }

    const handleRemoveImage = (index) => {
        setData((prev) => ({
            ...prev,
            image: prev.image.filter((_, i) => i !== index) 
        }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", data.name);
        data.image.forEach((file) => formData.append("image", file));


        const res = await fetch(`${BaseURL}/category/add`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include',
            body: formData 
        })

        const result = await res.json()

        console.log(result)
        if(result.success == false){
            toast.error("Something wrong went add new category")
        }
        toast.success("Add new category successfully")
    }

    console.log('data',data)
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black opacity-80 flex items-center justify-center'>
      <div className='flex flex-col w-[50%] bg-white opacity-100 gap-5 p-4'>
            <div className='flex justify-between '>
                <div className='font-semibold'>
                    <h1 className='opacity-100'>Category</h1>
                </div>
                <div className='opacity-100 font-bold cursor-pointer' onClick={close}>
                    <IoMdClose size={26}/>
                </div>
            </div>
            <span className='w-full bg-black h-[2px]'></span>
            <form action="" className='w-full bg-blue-50 py-2 flex flex-col gap-5'>
                <div className='flex gap-2 items-center'>
                    <label htmlFor="" className='font-bold'>Name: </label>
                    <input type="text" name='name' onChange={(e)=>setData((prev)=>({...prev,[e.target.name]: e.target.value}))} className='w-full outline-none border focus-within:border-amber-300 rounded-md p-2' />
                </div>
                <div className='flex items-center gap-2 '>
                    <label htmlFor="" className='font-bold'>Image: </label>
                    <div className='relative '>
                        <label htmlFor="file-upload">
                            <CiSquarePlus size={40} className='cursor-pointer hover:rotate-180 duration-300'/>
                        </label>
                        <input type="file" multiple id='file-upload' onChange={handleFile} className=' absolute top-0 hidden z-30'  />
                    </div>
                </div>
                <div className="w-full overflow-x-scroll">
                <div className="flex w-[200%] flex-nowrap gap-2">
                    {data.image.map((item,index)=>(
                        <div key={index} className='relative w-[10%] bg-red-500 h-[100px]'>
                            <img src={URL.createObjectURL(item)} alt={index} className='w-full h-full'/>
                            <CiSquareRemove className='absolute top-1 right-1 cursor-pointer' size={30} onClick={() => handleRemoveImage(index)}/>
                        </div>
                    ))}
                </div>
                </div>
                <button disabled={data.name == '' || data.image.length == 0} onClick={(e)=>handleSubmit(e)} className='bg-gray-500 hover:bg-green-400 transition duration-300 cursor-pointer hover:text-white p-2 rounded'>Submit</button>
            </form>
      </div>
    </div>
  )
}

export default CategoryAdd
