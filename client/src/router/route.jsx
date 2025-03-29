import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SearchPage from '../pages/SearchPage'
import Login from '../pages/Login'
import Register from '../pages/Register'

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
                path: "/search",
                element: <SearchPage></SearchPage>
            },
            {
                path: "/login",
                element:<Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    }
])


export default router