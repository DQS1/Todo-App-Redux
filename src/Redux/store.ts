// import { compose, legacy_createStore } from 'redux';
// import rootReducer from './reducer';

import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from '~/components/Filters/FilterSlice';
import { todoReducer } from '~/components/Todo/TodoSlice';

// const composeEnhancers =
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = legacy_createStore(rootReducer, composeEnhancers());

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

// export default store;

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    todoList: todoReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
