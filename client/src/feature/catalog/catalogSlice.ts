import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Products } from "../../app/models/products";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Products>()

export const fetchProductsAsybc =  createAsyncThunk<Products[]>(
    'catalog/fetchProductsAsync',
    async(_, thunkAPI) => {
        try{
return await agent.catalog.list()
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

export const catalogSlice = createSlice({
    name:'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers:{},
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
    })
})

export const productSelector = productsAdapter.getSelectors((state: RootState) => state.catalog)