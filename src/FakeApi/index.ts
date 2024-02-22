import { createServer, Model, Registry } from 'miragejs';
import { FactoryDefinition, ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';
import { Priority } from '~/components/Todo/TodoSlice';

type TodoState = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
};

type AppRegistry = Registry<
  { todos: ModelDefinition<TodoState> },
  {
    todo: FactoryDefinition<TodoState>;
  }
>;

type AppSchema = Schema<AppRegistry>;

export function setupSever() {
  createServer({
    models: {
      todos: Model
    },
    routes() {
      this.get('/api/todos', (schema) => {
        return schema.all('todos');
      });
      this.post('/api/todos', (schema, request) => {
        const payload = JSON.parse(request.requestBody);

        return schema.create('todos', payload);
      });
      this.post('/api/updateTodo', (schema: AppSchema, request) => {
        const id = JSON.parse(request.requestBody);
        const currentTodo = schema.find('todos', id);
        currentTodo?.update({ completed: !currentTodo?.completed });
        return currentTodo;
      });
    }
  });
}
