import { Divider } from 'antd';
import { useEffect } from 'react';
import { setupSever } from '~/FakeApi';
import { useAppDispatch } from '~/hooks/hooks';
import Filters from './Filters/Filters';
import { TitleStyled, WrapperContainer } from './HomePageStyled';
import { fetchTodos } from './Todo/TodoSlice';
import TodoList from './TodoList/TodoList';

if (process.env.NODE_ENV === 'development') {
  setupSever();
}

function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <WrapperContainer>
      <TitleStyled>TODO APP with REDUX</TitleStyled>
      <Filters />
      <Divider />
      <TodoList />
    </WrapperContainer>
  );
}

export default HomePage;
