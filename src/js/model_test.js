'use strict';

class Todo {
    constructor(id, name, description, check, dueDate) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._check = check;
        this._dueDate = dueDate;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    set name(value) { this._name = value; }
    get description() { return this._description; }
    set description(value) { this._description = value; }
    get check() { return this._check; }
    set check(value) { this._check = value; }
    get dueDate() { return this._dueDate; }
    set dueDate(value) { this._dueDate = value; }
}

class TodoCollection {
    constructor() {
        this._todos = [];
        this._maxId = 0;
        this._numOpenTodos;
        this._numClosedTodos;
    }

    getNewId() {
        let id = 0;
        for (let i = 0; i < this._todos.length; i++) {
            if (this._todos[i].id > id) {
                id = this._todos[i].id;
            } else {
                id = id;
            }
        }
        this._maxId = id +1;
        return parseInt(id) + 1;
    }

    getIndexById(id) {
        return this._todos.findIndex(thisTodo => {
            return thisTodo.id === id;
        });
    }

    getOneTodoById(id) {
        return this._todos.find(thisTodo => {
            return thisTodo.id === id;
        });
    }

    getAllTodos() {
        return this._todos;
    }

    addTodo(todo) {
        this._todos.push(todo);
    }

    updateTodo(todo) {
        const indexToUpdate = this.getIndexById(todo.id);
        this._todos.splice(indexToUpdate, 1, todo);
    }

    deleteTodo(todo) {
        const indexToDelete = this.getIndexById(todo.id);
        this._todos.splice(indexToDelete, 1);
    }
}

function storeList(todoList) {
    localStorage = JSON.stringify(todoList)
}

const todoList = new TodoCollection();
todoList.addTodo(new Todo(todoList.getNewId(), 'First Todo', 'First description', false, '2022-04-27'));
todoList.addTodo(new Todo(todoList.getNewId(), 'Second Todo', 'Second description', false, '2022-04-28'));
todoList.addTodo(new Todo(todoList.getNewId(), 'Third Todo', 'Third description', false, '2022-04-29'));
todoList.addTodo(new Todo(todoList.getNewId(), 'Fourth Todo', 'Fourth description', false, '2022-04-30'));

let oldTodoToUpdate = todoList.getOneTodoById(3);
console.log(todoList);
const updateTodo = new Todo(3, 'Updated Todo', 'Updated description', true, '2022-04-08');
todoList.updateTodo(updateTodo);

console.log('Neue Liste:');
console.log(todoList);