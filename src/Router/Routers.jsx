import {createBrowserRouter,} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute/PrivateRoute";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            }
        ]
    },
    // admin routes
    { 
        path:"dashboard",
        element:(
         <PrivateRoute>
            
         </PrivateRoute>
        ),
        children:[

        ]
    }
]); 