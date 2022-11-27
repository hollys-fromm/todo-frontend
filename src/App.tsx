import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import { TodoType } from './type/todo';
import { getTodos, patchTodo, postTodo } from './api/todo';
import { produce } from 'immer';
import { UnorderedList, Container, Box, Badge, Input } from '@chakra-ui/react';

function App() {
  const [todos, setTodos] = useState<TodoType[]>(null);
  const [inputText, setInputText] = useState<string>('');

  const addTodo = (newTodo: TodoType) => setTodos((prevTodos) => [newTodo, ...prevTodos]);

  const toggleTodo = async (id: Pick<TodoType, 'id'>['id']) => {
    const targetTodo = todos.find((todo) => todo.id === id);
    const newTodo = await patchTodo({
      ...targetTodo,
      status: targetTodo.status === 'DONE' ? 'TODO' : 'DONE',
    });
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? newTodo : todo)));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  return (
    <Container
      className="App"
      maxW="md"
      minH="100vh"
      borderWidth="1px"
      boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px;'}
      centerContent={true}
      padding="20px"
      bgColor="blackAlpha.700"
      color="#fff"
    >
      <Badge>Todo List</Badge>
      <Box marginTop="20px">
        <UnorderedList className="todos">
          {todos && todos.map((todo) => <Todo key={todo.id} {...todo} toggleTodo={toggleTodo} />)}
        </UnorderedList>
      </Box>
      <Box width="100%"></Box>

      <Input
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        value={inputText}
        onKeyDown={(e) => {
          if (e.code.toLocaleLowerCase() === 'enter') {
            postTodo({
              title: inputText,
              detail: '임시 detail',
              status: 'TODO',
            }).then((newTodo) => {
              addTodo(newTodo);
            });

            setInputText('');
          }
        }}
      />
    </Container>
  );
}

export default App;
