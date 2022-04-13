class Todo {
    constructor(id, text, description) {
        this._id = Date.now()
        this._text = text;
        this._description = description;
        this._categories = [];
        this._checked = false;
        this._deleted = false;
        this._createdDate;
    }

    get id() { return this._id; }
    get text() { return this._text; }
    get description() { return this._description; }
    get categories() { return this._categories; }
    get checked() { return this._checked; }
    get deleted() { return this._deleted; }
    get createdDate() { return this._createdDate; }

    set text(value) { this._text = value; }
    set description(value) { this.description = value; }
    set checked(value) { this._checked = value; }
    set deleted(value) { this._deleted = value; }
    set createdDate(value) { this._createdDate = value; }
}

class TodoCollection {
    constructor() {
        this._maxId = 0;
        this._todos = [];
        this._createDate;
    }
    get todos() { return this._todos; }

    addToDo = (todo) => {
        todo._id = this._maxId;
        this._todos.push(todo);
        this._maxId++;
    }

    removeToDo = (todo) => {
        this._todos.splice(todo, 1);
    }

    setCreatedDate() {
        const date = new Date();
        // Hours part from the timestamp
        const year = date.getFullYear();
        // Minutes part from the timestamp
        let month = (date.getMonth() + 1);
        if (month < 10) { month = `0${month}`; }
        // month = month.length < 2 ? `0${month}` : month;
        // Seconds part from the timestamp
        let day = date.getDate();
        if (day < 10) { day = `0${day}`; }
        const currentDate = day + "." + month + "." + year;
        return currentDate;
    }
}

const todoItems = new TodoCollection();
const categories = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E', 'Category F'];

const storeModelLocalStorage = (todo) => {
    if (todoItems) { localStorage.setItem('TodoList', JSON.stringify(todoItems)); }
}

const renderTodo = (todo) => {
    // console.log(todo);
    const list = document.querySelector('#accordionExample');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    const accordion = document.querySelector(`#accordionExample > [data-key='${todo.id}']`)

    if (todo.deleted) {
        accordion.remove();
        // add this line to clear whitespace from the list container
        // when `todoItems` is empty
        if (todoItems.length === 0) list.innerHTML = '';
        return
    }

    const isChecked = todo.checked ? 'done' : '';
    const checkboxChecked = todo.checked ? 'checked' : '';
    const node = document.createElement('div');
    node.setAttribute('class', `accordion-item todo-item ${isChecked}`)
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `      
                <div class="row">
                    <div class="col-sm-1" id="checkboxContainer" data-key="${todo.id}">
                        <input id="${todo.id}" type="checkbox" class="tick js-tick" ${checkboxChecked}/>
                        <label for="${todo.id}" ></label> 
                    </div>
                    <div class="col-sm-11">
                        <h2 class="accordion-header" id="heading${todo.id}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${todo.id}" aria-expanded="true" aria-controls="collapse${todo.id}">
                                ${todo.text}
                            </button>
                        </h2>
                    </div>
                </div>    
                    <div id="collapse${todo.id}" class="accordion-collapse collapse todo-list js-todo-list" aria-labelledby="heading${todo.id}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col-sm-1">
                                </div>
                                <div class="col-sm-7" data-key="${todo.id}">
                                    Description
                                    <textarea id="description${todo.id}">${todo.description}</textarea>
                                </div>
                                <div class="col-sm-4" data-key="${todo.id}">
                                    <button type="button" class="btn btn-success edit-todo js-edit-todo">Edit</button>
                                    <button type="button" class="btn btn-danger delete-todo js-delete-todo">Delete</button>
                                </div>
                                <div class="row">
                                  <div class="form-group col-md-1"></div>
                                  <div class="col-sm-4">
                                    <div class="form-group">
                                      <label for="inputState"></label>
                                      <select id="inputState" class="form-control">
                                        <option selected>Categories...<i class="fas fa-caret-down"></i></option>
                                        ${categories.forEach((b) => { `<option>${b}</option>`; })}
                                      </select>
                                    </div>
                                   </div> 
                                </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-1">
                              </div>
                              <div class="col-sm-11">
                                <span>Created Date: ${todo.createdDate}</span>
                              </div>
                            </div>
                        </div>
                    </div>`;


    if (accordion) {
        list.replaceChild(node, accordion);
    } else {
        list.append(node);
    }
}

const toggleDone = (key) => {
    // findIndex is an array method that returns the position of an element
    // in the array.
    const index = todoItems.todos.findIndex(item => item.id === Number(key));
    // Locate the todo item in the todoItems array and set its checked
    // property to the opposite. That means, `true` will become `false` and vice
    // versa.
    todoItems.todos[index].checked = !todoItems.todos[index].checked;
    renderTodo(todoItems.todos[index]);
    storeModelLocalStorage();
}

const deleteTodo = (key) => {
    const index = todoItems.todos.findIndex(item => item.id === Number(key));
    const todo = todoItems.todos[index];
    todo.deleted = true;
    console.log(todo);
    renderTodo(todo);
    todoItems.removeToDo(todo);
    storeModelLocalStorage();
}

const editToDo = (key) => {
    // find the corresponding todo object in the todoItems array
    const index = todoItems.todos.findIndex(item => item.id === Number(key));
    // Create a new object with properties of the current todo item
    // and a `deleted` property which is set to true
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    // remove the todo item from the array by filtering it out
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}


const form = document.querySelector('#create-form');

const createItemHandler = (e) => {
    e.preventDefault();
    const input = document.querySelector('#taskName');
    const text = input.value.trim();
    if (text !== "") {
        newTodo = new Todo();
        newTodo.text = text;
        newTodo.createdDate = todoItems.setCreatedDate();
        // console.log(newTodo.createDate);
        renderTodo(newTodo);
        input.value = "";
        input.focus();
        todoItems.addToDo(newTodo);
        storeModelLocalStorage();
    }
}

form.addEventListener('submit', e => {
    createItemHandler(e)
})

// Select the entire list
const list = document.querySelector('#accordionExample');
// Add a click event listener to the list and its children
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        console.log(itemKey);
        toggleDone(itemKey);
    }

    // add this `if` block
    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }

    if (event.target.classList.contains('js-edit-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        console.log(itemKey);
    }
});

const loadFromStorage = () => {
    const loadedItemsFromStorage = JSON.parse(localStorage.getItem('TodoList'));
    if (loadedItemsFromStorage._todos.length != null) {
        loadedItemsFromStorage._todos.forEach((element) => {
            const newTodoItem = new Todo(element._id, element._text, element._description);
            newTodoItem.createdDate = element._createdDate;
            newTodoItem.checked = element._checked;
            todoItems.addToDo(newTodoItem);
            renderTodo(newTodoItem);
        });
    }
};

const init = () => {
    loadFromStorage();
};

init();