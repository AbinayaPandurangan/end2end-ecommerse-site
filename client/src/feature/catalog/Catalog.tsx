import { useState, useEffect } from "react";
import {Products} from "../../app/models/products";
import ProductList from "./ProductList";


function Catalog(){
    const [products, setProducts] = useState<Products[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/Product')
  .then(response => response.json())
  .then(data => setProducts(data))
  }, [])
  


    return(
       <ProductList products={products}/>
    )

}

export default Catalog;