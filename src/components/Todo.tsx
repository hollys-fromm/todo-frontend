import React from 'react';
import type { TodoType } from '../type/todo';
import { ListItem, Badge, Box } from '@chakra-ui/react';

interface Props extends TodoType {
  toggleTodo: (id: Pick<TodoType, 'id'>['id']) => void;
}

function Todo({ title, detail, status, toggleTodo, id }: Props) {
  return (
    <ListItem
      onClick={() => {
        toggleTodo(id);
      }}
      display="flex"
      alignItems="center"
    >
      <Badge height="100%" colorScheme="purple" className={status === 'TODO' && 'hidden'}>
        완료
      </Badge>
      <Box marginLeft="10px" className={status === 'DONE' && 'done'}>
        <span className="title">{title}</span> <span className="detail">{detail}</span>
      </Box>
    </ListItem>
  );
}

export default Todo;
