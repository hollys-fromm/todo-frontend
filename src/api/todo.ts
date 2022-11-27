import { AxiosPromise, AxiosResponse } from 'axios';
import { TodoType } from './../type/todo';
import api from './core';

export const getTodos = async () => {
  const { data: newTodos } = await api.get('/todos/');
  return newTodos;
};

export const patchTodo = async (todo: TodoType) => {
  const { data: newTodo } = await api.patch(`/todos/${todo.id}/`, todo);
  return newTodo;
};

export const postTodo = async (todo: Omit<TodoType, 'id'>) => {
  const { data: newTodo } = await api.post('/todos/', todo);
  return newTodo;
};
