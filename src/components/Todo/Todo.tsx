import { Checkbox, Row, Tag } from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '~/hooks/hooks';
import { updateTodo } from './TodoSlice';

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
  priority: string;
  status: boolean;
}

function Todo({ id, name, priority, status }: propsType) {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(status);

  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(updateTodo(id));
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
      <Tag color={priorityLevels[priority]} style={{ margin: 0 }}>
        {priority}
      </Tag>
    </Row>
  );
}

export default Todo;
