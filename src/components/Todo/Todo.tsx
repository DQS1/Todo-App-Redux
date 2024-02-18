import { Checkbox, Row, Tag } from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '~/hooks/hooks';
import { todoActions } from './TodoSlice';

export type PriorityLevels = {
  High: string;
  Medium: string;
  Low: string;
  [key: string]: string; // Thêm chỉ mục kiểu 'string'
};

const priorityLevels: PriorityLevels = {
  High: 'red',
  Medium: 'yellow',
  Low: 'green'
};

interface propsType {
  id: string;
  name: string;
  prioriry: string;
  status: boolean;
}

function Todo({ id, name, prioriry, status }: propsType) {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(status);

  const toggleCheckbox = () => {
    console.log('🚀 ~ id:', id);

    setChecked(!checked);
    dispatch(todoActions.statusTodoChange(id));
  };
  return (
    <Row
      justify={'space-between'}
      style={{
        marginBottom: 3,
        ...(status
          ? {
              opacity: 0.5,
              textDecoration: 'line-through',
              transition: 'all 0.3s ease-in'
            }
          : {})
      }}
    >
      <Checkbox checked={status} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityLevels[prioriry]} style={{ margin: 0 }}>
        {prioriry}
      </Tag>
    </Row>
  );
}

export default Todo;
