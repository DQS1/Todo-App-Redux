import { createSlice } from '@reduxjs/toolkit';

export type TodoState = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
};

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

const initialState: TodoState[] = [
  {
    id: '1',
    title: 'Learn Yoga',
    completed: false,
    priority: Priority.High
  },
  { id: '2', title: 'Learn React', completed: true, priority: Priority.Medium },
  {
    id: '3',
    title: 'Learn Javascript',
    completed: false,
    priority: Priority.Low
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const TodoReducer = (state = initState, action: any) => {
//   switch (action?.type) {
//     case 'todoList/addTodo':
//       return [...state, action?.payload];
//     case 'todoList/statusTodoChange':
//       return state?.map((todo) =>
//         todo?.id === action?.payload
//           ? { ...todo, completed: !todo?.completed }
//           : todo
//       );
//     default:
//       return state;
//   }
// };

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.push(action?.payload);
    },
    statusTodoChange(state, action) {
      const currentTodo = state?.find((todo) => todo?.id === action?.payload);
      currentTodo && (currentTodo.completed = !currentTodo.completed);
    }
  }
});

const { actions, reducer } = todoSlice;

export { actions as todoActions, reducer as todoReducer };
