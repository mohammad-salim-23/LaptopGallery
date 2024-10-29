import {createBrowserRouter,} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
<<<<<<< HEAD
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Admin/Dashboard/Dashboard";
import SignUp from "../Pages/SignUp";
import SignIn from "../Pages/SignIn";
import AddLaptop from "../Admin/Laptop/AddLaptop";
import AddMobile from "../Admin/Mobile/AddMobile";
=======
import Error from "../Pages/Error/Error";



>>>>>>> 9612c83e1b17a505a04b9ec4b917a1df0b2e0a13


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
        
            <Dashboard></Dashboard>
     
        ),
        children:[
             {
                path:"addLaptop",
                element:<AddLaptop></AddLaptop>
             } ,
             {
                path:"addMobile",
                element:<AddMobile></AddMobile>
             }
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