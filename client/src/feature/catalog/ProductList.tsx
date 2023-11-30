import { Grid } from "@mui/material";
import {Products} from "../../app/models/products";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props{
    products: Products[]
}

function ProductList({products}: Props){
    const {productsLoaded} = useAppSelector(state => state.catalog)

    return(
        <><Grid container spacing={4}>
        {products.map((product) => (
            <Grid item xs={4} key={product.id}>
                {!productsLoaded ? (
<ProductCardSkeleton/>
                ) :(
                <ProductCard  
          product={product}
          /> )}
            </Grid>
          
        )
        )}
      </Grid></>
    )

}

export default ProductList;