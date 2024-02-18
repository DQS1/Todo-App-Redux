import { Priority } from '~/components/Filters/Filters';
import { TodoState } from '~/components/Todo/TodoSlice';

export const addToDo = (data: TodoState) => {
  return {
    type: 'todoList/addTodo',
    payload: data
  };
};

export const searchFilterChange = (text: string) => {
  return {
    type: 'filter/searchFilterChange',
    payload: text
  };
};

export const statusFilterChange = (data: Priority) => {
  return {
    type: 'filter/statusFilterChange',
    payload: data
  };
};

export const priorityFilterChange = (data: boolean) => {
  return {
    type: 'filter/priorityFilterChange',
    payload: data
  };
};

export const statusTodoChange = (index: string) => {
  return {
    type: 'todoList/statusTodoChange',
    payload: index
  };
};
