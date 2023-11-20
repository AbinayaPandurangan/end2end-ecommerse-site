import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {Products} from "../../app/models/products";
import ProductList from "./ProductList";


function Catalog(){
    const [products, setProducts] = useState<Products[]>([])
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    agent.catalog.list().then(products => setProducts(products))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingComponent message='Loading Products...'/>
  


    return(
       <ProductList products={products}/>
    )

}

export default Catalog;