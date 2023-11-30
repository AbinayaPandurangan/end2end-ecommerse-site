import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/models/Pagination";
import { ProductParams, Products } from "../../app/models/products";
import { RootState } from "../../app/store/configureStore";

interface CatalogState{
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Products>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if (productParams.brands?.length > 0)  params.append('brands', productParams.brands.toString());
    if (productParams.types?.length > 0)  params.append('types', productParams.types.toString());

    return params;
}

export const fetchProductsAsybc =  createAsyncThunk<Products[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async(_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try{
            const response = await agent.catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        }
        catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }

)

export const fetchProductAsync =  createAsyncThunk<Products, number>(
    'catalog/fetchProductAsync',
    async(productId, thunkAPI) => {
        try{
return await agent.catalog.details(productId)
        }
        catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }

)
export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async(_, thunkAPI) => {
        try {
            return agent.catalog.fetchFilters()
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const catalogSlice = createSlice({
    name:'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams:{
            pageNumber: 1,
            pageSize: 6,
            orderBy: 'name',
            brands:[],
            types:[]
        },
        metaData: null
    }),
    reducers:{
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams={...state.productParams,...action.payload, pageNumber: 1}
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams={...state.productParams,...action.payload}
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload
        },
        resetProductParams: (state) => {
            state.productParams = {
                pageNumber: 1,
                pageSize: 6,
                orderBy: 'name',
                brands:[],
                types:[]
            }
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsybc.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsybc.fulfilled, (state, action)=> {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsybc.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'idle'
        })
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status ='pendingFetchProduct'
        })
        builder.addCase(fetchProductAsync.fulfilled, (state, action) =>{
            productsAdapter.upsertOne(state, action.payload);
            state.status='idle'
        })
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status ='idle'
        })
        builder.addCase(fetchFilters.pending, (state)=> {
            state.status='pendingFetchFilters'
        })
        builder.addCase(fetchFilters.fulfilled, (state, action)=> {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
        })
        builder.addCase(fetchFilters.rejected, (state, action)=> {
            state.status='idle';
            console.log(action.payload)
        })
    })
})

export const productSelector = productsAdapter.getSelectors((state: RootState) => state.catalog)

export const {setProductParams , resetProductParams, setMetaData , setPageNumber} = catalogSlice.actions;