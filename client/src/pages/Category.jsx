import React, { useState } from 'react'
import CategoryAdd from '../components/CategoryAdd'

const Category = () => {
    const [openCategoryAdd,setOpenCategoryAdd] = useState(false)
  return (
    <section>
        <div className='flex flex-col gap-2 relative'>
            <div className='flex justify-between p-4 bg-red-500' >
                <div>
                    <h1>Category</h1>
                </div>
                <div onClick={()=>setOpenCategoryAdd(true)}>
                    <h1>Add Category</h1>
                </div>
            </div>
            <div className='bg-green-500 p-4'>
                <div>
                    product
                </div>
            </div>
        </div>
        {openCategoryAdd ? <CategoryAdd close={()=>setOpenCategoryAdd(false)}></CategoryAdd>: <></>}
    </section>
  )
}

export default Category
