
import { Todo } from '../classes/Todo.class.js'
import { TodoList } from '../classes/TodoList.class.js'
import { todoList } from '../main.js';

const divTodo = document.querySelector('.content__todos'),
newTodoInput  = document.querySelector('.new-todo'),
    deleteBtn = document.querySelector('.clear-completed'),
divFilters    = document.querySelector('.content__footer-filters'),
body          = document.body,
darkModeButton = document.querySelector('.darkmodetoggle');

let darkMode = false;

export const createHtml = ( todo ) => {

    const html = `
        <div class="check">
            <img class="checkimg" src="./images/icon-check.svg" alt="">
        </div>
        <input type="text" class="todo" value="${ todo.task }">
        <img class="cross" src="./images/icon-cross.svg" alt="">`;

    const div = document.createElement("div");
    div.setAttribute("class", `animate__animated animate__bounceIn content__todos-todo todoContainer ${ todo.completed ? 'checked' : '' }` );
    div.setAttribute("id", `${ todo.id }` );

    div.innerHTML = html;

    divTodo.append( div );

    return div;
}

newTodoInput.addEventListener('keyup', ( event ) => {

    if ( event.keyCode == 13 && newTodoInput.value.length > 0 ) {

        const newTodo = new Todo( newTodoInput.value );

        todoList.newTodo( newTodo )

        createHtml( newTodo );

        newTodoInput.value = '';

    }

})


divTodo.addEventListener('click', ( event ) => {
    
    const name = event.target.localName;
    let parentName = event.target.parentElement;
    
    while ( !parentName.getAttribute("class").includes("content__todos-todo") ) {
        parentName = parentName.parentElement;
    }

    const todoId = parentName.getAttribute("id");

    if ( (name.includes('img') && event.target.classList.contains("checkimg")) || 
    event.target.classList.contains("check")  ) {

        todoList.checkTodo( todoId );

        parentName.classList.toggle('checked');

    }

    else if ( name.includes('img') && event.target.classList.contains("cross") ){

        todoList.deleteTodo( todoId );

        divTodo.removeChild( parentName );

    }

} )

deleteBtn.addEventListener('click', () => {

    todoList.deleteChecked();

    for( let i = divTodo.children.length -1; i >= 0; i-- ){

        const elemento = divTodo.children[i];

        if( elemento.classList.contains("checked") ) {
            divTodo.removeChild(elemento);
        }

    }

})

divFilters.addEventListener('click', (event) => {


    const text = event.target.classList;

    if ( !text ) {return;}

    for( const child of divFilters.children ){
        child.classList.remove("selected");
    }

    event.target.classList.add('selected');

    for( const elem of divTodo.children ) {

        elem.classList.remove('hidden');
        const completed = elem.classList.contains('checked');

        if ( text.contains('active') ){
            if ( completed ) {
                elem.classList.add('hidden');
            }
        } else if( text.contains("complete") ) {
            if ( !completed ) {
                elem.classList.add('hidden');
            }
        }

    }

})

darkModeButton.addEventListener('click', () => {

    body.classList.toggle('dark');
    darkMode = !darkMode;
    const src = darkModeButton.getAttribute('src');
    (src == "./images/icon-moon.svg")
    ? darkModeButton.setAttribute("src", "./images/icon-sun.svg")
    : darkModeButton.setAttribute("src", "./images/icon-moon.svg");

});