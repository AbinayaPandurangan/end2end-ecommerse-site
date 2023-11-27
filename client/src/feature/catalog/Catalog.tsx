import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsybc, productSelector } from "./catalogSlice";
import ProductList from "./ProductList";


function Catalog(){
const products = useAppSelector(productSelector.selectAll)
const {productsLoaded} = useAppSelector(state => state.catalog)
const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsybc())
  }, [dispatch, productsLoaded])

  if (status.includes('pending')) return <LoadingComponent message='Loading Products...'/>
  


    return(
       <ProductList products={products}/>
    )

}

export default Catalog;