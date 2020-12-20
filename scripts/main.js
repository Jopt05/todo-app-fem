
import { TodoList } from './classes/TodoList.class.js'
import { createHtml } from './htmlComponents/Components.js'

export const todoList = new TodoList();

todoList.todos.forEach( todo => createHtml( todo ) );
