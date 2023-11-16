import { createBrowserRouter } from "react-router-dom";
import About from "../../../feature/about/About";
import Catalog from "../../../feature/catalog/Catalog";
import ProductDetails from "../../../feature/catalog/ProductDetails";
import Contact from "../../../feature/contact/Contact";
import HomePage from "../../../feature/Homepage";
import App from "../App";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {path: '', element:<HomePage/> },
            {path: 'catalog', element:<Catalog/> },
            {path: 'catalog/:id', element:<ProductDetails/> },
            {path: 'about', element:<About/> },
            {path: 'contact', element:<Contact/> },
        ]
    }
])