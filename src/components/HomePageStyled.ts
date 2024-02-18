import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const WrapperContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 10px 4px #bfbfbf;
  border-radius: 5px;
  height: 90dvh;
`;

export const TitleStyled = styled(Title)`
  text-align: center;
`;
