import {
  Col,
  Input,
  Radio,
  Row,
  Select,
  SelectProps,
  Tag,
  Typography
} from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '~/hooks/hooks';
import { Status, filterActions } from './FilterSlice';
import { Priority } from '../Todo/TodoSlice';

const { Search } = Input;
type TagRender = SelectProps['tagRender'];

interface optionInterface {
  value: string;
  label: string;
}

const priorityColorMapping = {
  High: 'red',
  Medium: 'yellow',
  Low: 'green'
};

export interface dataFilterInterface {
  search: string;
  status: Status;
  priority: Priority[];
}

function Filters() {
  const [searchText, setSearchText] = useState('');

  const dispatch = useAppDispatch();

  const option: optionInterface[] = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
  ];

  const tagRender: TagRender = (props) => {
    const { label, closable, onClose, value } = props;
    const color: keyof typeof priorityColorMapping = value;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color={priorityColorMapping[color]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const handleInputSearchChange = (e: { target: { value: string } }) => {
    const value = e?.target?.value;
    setSearchText(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStatusChange = (e: any) => {
    const value = e?.target?.value;
    dispatch(filterActions.statusFilterChange(value));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePriorityChange = (e: any) => {
    dispatch(filterActions.priorityFilterChange(e));
  };

  return (
    <Row justify={'center'}>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: '3', marginTop: '10' }}
        >
          Search
        </Typography.Paragraph>
        <Search
          placeholder='input search text'
          onChange={handleInputSearchChange}
          onSearch={() =>
            dispatch(filterActions.searchFilterChange(searchText))
          }
        />
      </Col>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group onChange={handleStatusChange} defaultValue={Status.All}>
          <Radio value={Status.All}>All</Radio>
          <Radio value={Status.Completed}>Completed</Radio>
          <Radio value={Status.Todo}>To do</Radio>
        </Radio.Group>
      </Col>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          placeholder='Please select'
          allowClear
          mode='multiple'
          style={{ width: '100%' }}
          options={option}
          tagRender={tagRender}
          onChange={handlePriorityChange}
        />
      </Col>
    </Row>
  );
}

export default Filters;
