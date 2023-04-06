import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from '../../hooks/http.hook'

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

export const filterHero = createAsyncThunk(
    'filters/filterHero',
    ()=>{
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
)


const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        activeFilterChanged: (state, action)=> {state.activeFilter = action.payload}
    },
    extraReducers:(builder)=>{
        builder
            .addCase(filterHero.pending, state=> {state.filtersLoadingStatus = 'loading'})
            .addCase(filterHero.fulfilled, (state,action)=>{
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload
            })
            .addCase(filterHero.rejected, state=> {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(()=>{})
    }
})

const {actions, reducer} = filterSlice

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged,
    activeFilterChanged
} = actions;

