
import { loadItemsLeft } from '../htmlComponents/Components.js';
import { Todo } from './Todo.class.js';

export class TodoList {

    constructor() {

        this.loadLocalStorage();

    }

    newTodo( todo ) {
        this.todos.push( todo );
        this.saveLocalStorage();
        loadItemsLeft();
        
    }

    deleteTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id );
        this.saveLocalStorage();
        loadItemsLeft();
        
    }

    checkTodo( id ) {

        for( const todo of this.todos ) {

            if ( todo.id == id ) {
                todo.completed = !todo.completed;
                this.saveLocalStorage();
                break;
            }

        }
        loadItemsLeft();
        

    }

    deleteChecked() {
        this.todos = this.todos.filter( todo => !todo.completed );
        this.saveLocalStorage();
        loadItemsLeft();
        
    }

    saveLocalStorage() {
        localStorage.setItem('todo', JSON.stringify( this.todos ) );
        
    }

    loadLocalStorage() {
        
        this.todos = ( localStorage.getItem('todo') )
                    ? this.todos = JSON.parse( localStorage.getItem('todo') )
                    : this.todos = [];

        this.todos = this.todos.map( obj => Todo.fromJson( obj ) )
        loadItemsLeft();
        

    }

}