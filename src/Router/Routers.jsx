import {createBrowserRouter,} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Admin/Dashboard/Dashboard";
import SignUp from "../Pages/SignUp";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path:"/signup",
                element:<SignUp></SignUp>
            }
        ]
    },
    // admin routes
    { 
        path:"dashboard",
        element:(
         <PrivateRoute>
            <Dashboard></Dashboard>
         </PrivateRoute>
        ),
        children:[
              
        ]
    }
]); 