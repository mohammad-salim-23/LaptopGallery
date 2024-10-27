import {createBrowserRouter,} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Admin/Dashboard/Dashboard";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";


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
            },
            {
                path:"/signin",
                element:<SignIn></SignIn>
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
            //  {
            //     path:"addLaptop",
            //     element:
            //  } ,
            //  {
            //     path:"addMobile",
            //     element:
            //  },
            //  {
            //     path:"allMobile",
            //     element:
            //  },
            //  {
            //     path:"allLaptop",
            //     element:
            //  },
            //  {
            //  path:"users",
            //  element:
            //  }
        ]
    }
]); 