import { createSelector } from 'reselect';
import { TodoState } from '~/components/Todo/TodoSlice';
import { RootState } from './store';
import { Status } from '~/components/Filters/FilterSlice';

export const getTodoList = (state: RootState) => state?.todoList;
export const getFilter = (state: RootState) => state?.filters;

export const filterData = createSelector(
  [getTodoList, getFilter],
  (todoList, filterData) => {
    return todoList?.filter((todo: TodoState) => {
      if (filterData?.status === Status.All) {
        return filterData?.priority?.length
          ? todo.title
              ?.toLowerCase()
              .includes(filterData?.search?.toLowerCase()) &&
              filterData?.priority?.includes(todo?.priority)
          : todo?.title
              ?.toLowerCase()
              .includes(filterData?.search?.toLowerCase());
      }
      return filterData?.status === Status.Completed
        ? filterData?.priority?.length
          ? todo?.completed &&
            filterData?.priority?.includes(todo?.priority) &&
            todo.title
              ?.toLowerCase()
              .includes(filterData?.search?.toLowerCase())
          : todo?.completed &&
            todo.title
              ?.toLowerCase()
              .includes(filterData?.search?.toLowerCase())
        : filterData?.priority?.length
          ? !todo?.completed &&
            filterData?.priority?.includes(todo?.priority) &&
            todo.title
              ?.toLowerCase()
              .includes(filterData?.search?.toLowerCase())
          : !todo?.completed &&
            todo.title
              ?.toLowerCase()
              .includes(filterData?.search?.toLowerCase());
    });
  }
);
