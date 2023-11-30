import { FormControl,  Grid,  Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckBoxButtons from "../../app/components/CheckBoxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsybc, productSelector, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  {value: 'name', label:'Alphabetical'},
  {value: 'priceDesc', label:'Price - High to Low'},
  {value: 'price', label:'Price - Low to High'},
]


function Catalog(){
const products = useAppSelector(productSelector.selectAll)
const {productsLoaded, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog)
const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsybc());
  }, [dispatch, productsLoaded])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters())
  }, [dispatch, filtersLoaded])
  

  if (!filtersLoaded) return <LoadingComponent message='Loading Products...'/>
  


    return(
      <>
      <Grid container columnSpacing={4} rowSpacing={1}>
      <Grid item xs={3}>
        <Paper sx={{mb: 2}} >
          <ProductSearch/>
        </Paper>
        <Paper sx={{mb: 2, padding: 2}}>
        <FormControl>
  <RadioButtonGroup
  selectedValue={productParams.orderBy}
  onChange={(e)=> dispatch(setProductParams({orderBy: e.target.value}))}
  options={sortOptions}/>
</FormControl>
        </Paper>
        <Paper sx={{mb: 2, p:2}}>
       <CheckBoxButtons items={brands} checked={productParams.brands} onChange={(items: string[]) => dispatch(setProductParams({brands: items}))} />
        </Paper>
        <Paper sx={{mb: 2, p:2}}>
        <CheckBoxButtons items={types} checked={productParams.types} onChange={(items: string[]) => dispatch(setProductParams({types: items}))} />
        </Paper>
      </Grid>
      <Grid item xs={9}>
      <ProductList products={products}/>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        {metaData &&
        <AppPagination metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}/>}
      </Grid>
      </Grid>
      </>
       
    )

}

export default Catalog;