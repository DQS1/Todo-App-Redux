import { createSelector } from 'reselect';
import { TodoState } from '~/components/Todo/TodoSlice';
import { RootState } from './store';
import { Status } from '~/components/Filters/FilterSlice';

export const getTodoList = (state: RootState) => state?.todoList?.todos;
export const getFilter = (state: RootState) => state?.filters;

export const filterData = createSelector(
  [getTodoList, getFilter],
  (todoList, filterData) => {
    return todoList?.filter((todo: TodoState) => {
      if (filterData?.status === Status.All) {
        return filterData?.priorities?.length
          ? todo.title
              ?.toLowerCase()
              .includes(filterData?.search?.toLowerCase()) &&
              filterData?.priorities?.includes(todo?.priority)
          : todo?.title
              ?.toLowerCase()
              .includes(filterData?.search?.toLowerCase());
      }
      return (
        todo.title?.toLowerCase().includes(filterData?.search?.toLowerCase()) &&
        (filterData?.status === Status.Completed
          ? todo.completed
          : !todo.completed) &&
        (filterData?.priorities.length
          ? filterData?.priorities.includes(todo.priority)
          : true)
      );
    });
  }
);
