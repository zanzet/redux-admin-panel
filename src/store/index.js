import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import filters from '../reducers/filter';
import heroes from '../reducers/heroes';



const stringMiddleware = () => (dispatch) => (action) =>{
    if (typeof action == 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

const store = createStore(
                combineReducers({ heroes, filters }),
                compose(
                    applyMiddleware(ReduxThunk ,stringMiddleware),
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                )
 ) 

export default store;