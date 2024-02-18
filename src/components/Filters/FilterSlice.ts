import { createSlice } from '@reduxjs/toolkit';

export type FiltersState = {
  search: string;
  status: Status;
  priority: string[];
};

export enum Status {
  All = 'All',
  Completed = 'Completed',
  Todo = 'Todo'
}

const initialState: FiltersState = {
  search: '',
  status: Status.All,
  priority: []
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const FiltersReducer = (state = initState, action: any) => {
//   switch (action?.type) {
//     case 'filter/searchFilterChange':
//       return {
//         ...state,
//         search: action?.payload
//       };
//     case 'filter/statusFilterChange':
//       return {
//         ...state,
//         status: action?.payload
//       };
//     case 'filter/priorityFilterChange':
//       return {
//         ...state,
//         priority: action?.payload
//       };
//     default:
//       return state;
//   }
// };

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    searchFilterChange(state, action) {
      state.search = action?.payload;
    },
    statusFilterChange(state, action) {
      state.status = action?.payload;
    },
    priorityFilterChange(state, action) {
      state.priority = action?.payload;
    }
  }
});

const { actions, reducer } = filtersSlice;

export { actions as filterActions, reducer as filtersReducer };
