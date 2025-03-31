import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <div className='w-full min-w-[300px] flex items-center lg:min-w-[420px] h-12 rounded-lg border overflow-hidden text-neutral-600 bg-slate-50 group focus-within:border-amber-300'>
      <button className='flex cursor-pointer justify-center items-center h-full p-3 group-focus-within:text-amber-300'>
        <IoSearchOutline size={22}/>
      </button> 
      <input type="text" className='w-full h-full border-none outline-none pr-4' />
    </div>
  )
}

export default Search
