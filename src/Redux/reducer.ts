import { combineReducers } from 'redux';
import FiltersReducer from '~/components/Filters/FilterSlice';
import TodoReducer from '~/components/Todo/TodoSlice';

const rootReducer = combineReducers({
  FiltersReducer,
  TodoReducer
});

export default rootReducer;
