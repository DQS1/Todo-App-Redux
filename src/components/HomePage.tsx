import { Divider } from 'antd';
import Filters from './Filters/Filters';
import { TitleStyled, WrapperContainer } from './HomePageStyled';
import TodoList from './TodoList/TodoList';

function HomePage() {
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
