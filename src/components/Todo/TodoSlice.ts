import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

const todosData: TodoState[] = [];

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
  initialState: { status: false, todos: todosData },
  reducers: {
    // addTodo(state, action) {
    //   state?.todos?.push(action?.payload);
    // },
    // statusTodoChange(state, action) {
    //   const currentTodo = state?.todos?.find(
    //     (todo) => todo?.id === action?.payload
    //   );
    //   currentTodo && (currentTodo.completed = !currentTodo.completed);
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = false;
        state.todos = action?.payload;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state?.todos?.push(action?.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const currentTodo = state?.todos?.find(
          (todo) => todo?.id === action?.payload?.id
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        currentTodo && (currentTodo.completed = !currentTodo.completed);
      });
  }
});

const { actions, reducer } = todoSlice;

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await fetch('/api/todos');
  const data = await res.json();
  return data.todos;
});

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (newTodo: TodoState) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo)
    });
    const data = await res.json();
    return data.todos;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (idTodo: string) => {
    const res = await fetch('/api/updateTodo', {
      method: 'POST',
      body: JSON.stringify(idTodo)
    });

    const data = await res.json();
    return data.todos;
  }
);

export { actions as todoActions, reducer as todoReducer };
