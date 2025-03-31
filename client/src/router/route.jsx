import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SearchPage from '../pages/SearchPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../layout/Dashboard'
import Profile from '../components/Profile'
import Myorders from '../components/Myorders'
import Address from '../components/Address'
import Category from '../pages/Category'
import ProductAdmin from '../pages/ProductAdmin'
import UploadProduct from '../pages/UploadProduct'

const router = createBrowserRouter([
    {
        path:"/",
        element: <App></App>,
        children: [
            {
                path: "",
                element: <Home></Home>
            },
            {
                path: "search",
                element: <SearchPage></SearchPage>
            },
            {
                path: "login",
                element:<Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "dashboard",
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: "profile",
                        element: <Profile></Profile>
                    },
                    {
                        path: "myorders",
                        element : <Myorders></Myorders>
                    },
                    {
                        path: 'address',
                        element: <Address></Address>
                    },
                    {   
                        path: 'category',
                        element: <Category></Category>
                    },
                    {
                        path: 'product',
                        element: <ProductAdmin></ProductAdmin>
                    },
                    {
                        path: 'upload-product',
                        element: <UploadProduct></UploadProduct>
                    }
                ]
            }
        ]
    }
])


export default router