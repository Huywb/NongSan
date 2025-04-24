import React from 'react'
import { Outlet } from 'react-router-dom'
import UserMenu from '../components/UserMenu'

const Dashboard = () => {
  return (
    <section className='container mx-auto p-4 bg-blue-50'>
        <div className='flex gap-6 p-4'>
            <div className='flex-1 bg-white p-4 hidden md:block lg:block'>
                <UserMenu></UserMenu>
            </div>
            <div className='flex-3 bg-white p-4'>
                <Outlet></Outlet>
            </div>
        </div>
    </section>
  )
}

export default Dashboard
