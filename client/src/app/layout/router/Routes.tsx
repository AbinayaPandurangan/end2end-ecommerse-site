import { createBrowserRouter, Navigate } from "react-router-dom";
import About from "../../../feature/about/About";
import Login from "../../../feature/account/Login";
import Register from "../../../feature/account/Register";
import BasketPage from "../../../feature/basket/BasketPage";
import Catalog from "../../../feature/catalog/Catalog";
import ProductDetails from "../../../feature/catalog/ProductDetails";
import CheckoutPage from "../../../feature/checkout/CheckoutPage";
import Contact from "../../../feature/contact/Contact";
import HomePage from "../../../feature/Homepage";
import Notfound from "../../errors/NotFound";
import ServerError from "../../errors/ServerError";
import App from "../App";
import RequireAuth from "./RequireAuth";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {element: <RequireAuth/>, children: [
                {path: 'checkout', element:<CheckoutPage/> },
            ]},
            {path: '', element:<HomePage/> },
            {path: 'catalog', element:<Catalog/> },
            {path: 'catalog/:id', element:<ProductDetails/> },
            {path: 'about', element:<About/> },
            {path: 'contact', element:<Contact/> },
            {path: 'server-error', element:<ServerError/> },
            {path: 'not-found', element:<Notfound/> },
            {path: '*', element:<Navigate replace to='/not-found'/> },
            {path: 'basket', element:<BasketPage/> },
            {path: 'login', element:<Login/> },
            {path: 'register', element:<Register/> },
        ]
    }
])