import { Button, Col, Input, Row, Select, Space, Tag, Spin } from 'antd';
import { SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filterData } from '~/Redux/selector';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import Todo from '../Todo/Todo';
import { Priority, TodoState, addNewTodo } from '../Todo/TodoSlice';

function TodoList() {
  const [todoName, setTodoName] = useState<string>('');
  const [priority, setPriority] = useState<Priority>();
  const dispatch = useAppDispatch();

  const todoData: TodoState[] = useAppSelector(filterData);

  const spinning = useAppSelector((state) => state?.todoList?.status);

  const handlePriorityChange = (value: Priority) => {
    setPriority(value);
  };

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    const value = e?.target?.value;
    setTodoName(value);
  };

  function handledAddTodo() {
    const data = {
      id: uuidv4(),
      completed: false,
      title: todoName,
      priority: priority ?? Priority.Medium
    };
    todoName && dispatch(addNewTodo(data));
    setPriority(Priority.Medium);
    setTodoName('');
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col
        span={24}
        style={{
          height: 'calc(100% - 40px)'
        }}
      >
        <Spin style={{ justifyContent: 'center' }} spinning={spinning}>
          {todoData?.map((item: TodoState) => (
            <Todo
              id={item?.id}
              key={item?.id}
              name={item?.title || ''}
              priority={item?.priority || Priority.Medium}
              status={item?.completed}
            />
          ))}
        </Spin>
      </Col>
      <Col span={24}>
        <Space.Compact style={{ display: 'flex' }}>
          <Input value={todoName} onChange={handleInputChange} />
          <Select
            defaultValue={Priority.Medium}
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value={Priority.High} label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value={Priority.Medium} label='Medium'>
              <Tag color='yellow'>Medium</Tag>
            </Select.Option>
            <Select.Option value={Priority.Low} label='Low'>
              <Tag color='green'>Low</Tag>
            </Select.Option>
          </Select>
          <Button onClick={handledAddTodo} type='primary'>
            Add
          </Button>
        </Space.Compact>
      </Col>
    </Row>
  );
}

export default TodoList;
