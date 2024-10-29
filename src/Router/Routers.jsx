import {createBrowserRouter,} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import Laptops from "../Pages/Laptops/Laptops";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement:<Error></Error>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/laptop',
                element:<Laptops></Laptops>
            }
        ]
    },
]); 