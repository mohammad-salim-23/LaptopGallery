import {createBrowserRouter,} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import ProductsDetails from "../Components/ProductDetails/ProductsDetails";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import AddLaptop from "../Pages/Admin/Dashboard/Laptop/AddLaptop";
import Login from "../Pages/JoinUs/Login/Login";
import Registration from "../Pages/JoinUs/Registration/Registration";
import AddMobile from "../Pages/Admin/Dashboard/Mobile/AddMobile";
import TotalLaptop from "../Pages/Admin/Dashboard/Laptop/TotalLaptop";
import TotalMobile from "../Pages/Admin/Dashboard/Mobile/TotalMobile";
import TotalUsers from "../Pages/Admin/Dashboard/TotalUsers/TotalUsers";
import AdminPanel from "../Pages/Admin/Dashboard/AdminPanel/AdminPanel";
import UpdateProductLaptop from "../Layout/UpdateProductLaptop/UpdateProductLaptop";

import Laptops from "../Pages/Laptops/Laptops";
import Phone from "../Pages/Phone/Phone";
import Brand from "../Components/Shared/Brands/Brand";
import UpdateProductMobile from "../Layout/UpdateProductMobile/UpdateProductMobile";
import Accessories from "../Pages/Admin/Dashboard/Accessories/Accessories";
import TotalAccessories from "../Pages/Admin/Dashboard/Accessories/TotalAccessories";

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
                path: '/productDetails/:id',
                element:<ProductsDetails></ProductsDetails>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/dashboard/totalLaptop/:id',
                element: <UpdateProductLaptop></UpdateProductLaptop>,
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
            }
            ,
            {
                path: '/dashboard/totalMobile/:id',
                element: <UpdateProductMobile></UpdateProductMobile>,
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
            }
            ,
            {

                path: '/laptop',
                element: <Laptops></Laptops>
            },
            {
                path: '/phone',
                element: <Phone></Phone>
            },
            {
                path: '/products/:brand',
                element: <Brand></Brand>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'adminPanel',
                element: <AdminPanel></AdminPanel>
            }
            ,
            {
                path: 'addLaptop',
                element: <AddLaptop></AddLaptop>
            },
            {
                path: 'addMobile',
                element: <AddMobile></AddMobile>,
            },
            {
                path: 'accessories',
                element: <Accessories></Accessories>,
            },
            {
                path: 'totalLaptop',
                element: <TotalLaptop></TotalLaptop>
            },
            {
                path: 'totalMobile',
                element: <TotalMobile></TotalMobile>
            }
            ,
            {
                path: 'totalAccessories',
                element: <TotalAccessories></TotalAccessories>
            }
            ,
            {
                path: 'totalUsers',
                element: <TotalUsers></TotalUsers>
            }
        ]
    }
]); 