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
import Page from "../Components/Shared/ShopLayout/Page";

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
                path: 'registration',
                element: <Registration></Registration>
            },
            {
                path: 'products',
                element: <Page></Page>
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
                path: 'totalLaptop',
                element: <TotalLaptop></TotalLaptop>
            },
            {
                path: 'totalMobile',
                element: <TotalMobile></TotalMobile>
            }
            ,
            {
                path: 'totalUsers',
                element: <TotalUsers></TotalUsers>
            }
        ]
    }
]); 