import { createStore, combineReducers, compose } from 'redux';
import filters from '../reducers/filter';
import heroes from '../reducers/heroes';

const enhenser = (createStore) => (...arg) =>{
    const store = createStore(...arg);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) =>{
        if (typeof action == 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store
}

const store = createStore(
                combineReducers({ heroes, filters }),
                compose(
                    enhenser,
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                )
 ) 

export default store;