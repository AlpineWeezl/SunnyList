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
        this._nextId = 0;
        this._numOpenTodos;
        this._numClosedTodos;
    }

    get todos() { return this._todos; }
    getTodos(test) { return this._todos; }
    get nextId() { return this._nextId; }
    set nextId(value) { this._nextId = value; }
}

let model = {
    todoList: new TodoCollection()
}

const view = {
    clearList: () => {
        let range = document.createRange();
        range.selectNodeContents(document.getElementById("todoList"));
        range.deleteContents();
    },

    render: () => {
        view.clearList();
        const allTodos = model.todoList.todos;
        if (allTodos != null && allTodos != undefined) {
            const todoListHTML = document.getElementById("todoList");
            if (allTodos != null) {
                allTodos.forEach((todo) => {
                    const newTodoItem = document.createElement("div");
                    newTodoItem.id = `taskItem-${todo.id}`;
                    newTodoItem.className = `accordion-item`;
                    newTodoItem.innerHTML = `
                                <h2 class="accordion-header" id="heading-${todo.id}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" name="accordion-button-${todo.id}"
                                        data-bs-target="#collapse-${todo.id}" aria-expanded="false" aria-controls="collapse-${todo.id}">
                                        #${todo.id}: ${todo.name} : ${todo.dueDate}
                                    </button>
                                </h2>
                                <div todo.id="collapse-${todo.id}" class="accordion-collapse collapse" aria-labelledby="heading-${todo.id}"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <form todo.id="editForm-${todo.id}">
                                            <div class="container">
                                                <div class="row name-container">
                                                    <label for="todo.name-${todo.id}">Task Name</label>
                                                    <input type="text" name="todo.name" todo.id="todo.name-${todo.id}" value="${todo.name}">
                                                </div>
                                                <div class="row">
                                                    <label for="dueDate-${todo.id}">Deadline</label>
                                                    <input type="date" name="dueDate-${todo.id}" todo.id="todo.dueDate-${todo.id}" value="${todo.dueDate}">
                                                </div>
                                                <div class="row">
                                                    <label for="description-${todo.id}">Description</label>
                                                    <textarea name="description-${todo.id}" todo.id="taskDescription-${todo.id}" cols="30" rows="10"
                                                        placeholder="Enter your description here">${todo.description}</textarea>
                                                </div>
                                                <div class="row">
                                                    <div class="column">
                                                        <input type="checkbox" name="taskDone" todo.id="taskDone-${todo.id}">
                                                        <label for="taskDone-${todo.id}">Task Done</label>
                                                    </div>
                                                </div>
                                                <div class="row todo.id-container" htodo.idden>
                                                    <label for="todo.name-${todo.id}">Task-todo.id</label>
                                                    <input type="text" name="todo.name" todo.id="todo.name-${todo.id}" value="${todo.id}">
                                                </div>
                                                <div class="row">
                                                    <button type="submit" class="btn btn-success" name="edit" todo.id="btnEdit-${todo.id}"><i class="fa fa-save"
                                                            aria-htodo.idden="true" name="editIcon" todo.id="icoEdit-${todo.id}"></i></button>
                                                    <button type="button" class="btn btn-danger" name="delete" todo.id="btnEdit-${todo.id}"><i
                                                            class="fa fa-trash" aria-htodo.idden="true" name="icoDelete"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            `
                            
                    todoListHTML.appendChild(newTodoItem);
                });
            }
        }
    },
}

const controller = {
    init: () => {
        if (model.todoList.todos != null) {
            controller.loadFromLocalStorage();
        }
        console.log(model.todoList.todos);

        view.render();
    },

    loadFromLocalStorage: () => {
        if (JSON.parse(localStorage.getItem('TodoList') != undefined && JSON.parse(localStorage.getItem('TodoList') != null))) {
            const loadedModel = JSON.parse(localStorage.getItem('TodoList'));
            console.log(loadedModel);
            model.todoList.nextId = loadedModel._nextId;
            loadedModel._todos.forEach((element) => {
                console.log(element);
                model.todoList.todos.push(new Todo(element._id, element._name, element._description, element._check, element.dueDate));
            });
        }
    },

    storeList: () => {
        localStorage.setItem('TodoList', JSON.stringify(model.todoList));
    },

    addTodo: () => {
        if (((document.getElementById("newTodoName").value != "") && (document.getElementById("newTodoName").value != " "))) {
            const newId = model.todoList.nextId;
            model.todoList.todos.push(new Todo(newId, document.getElementById("newTodoName").value));
            document.getElementById("newTodoName").value = "";
            model.todoList.nextId++;
            controller.storeList();
            view.render();
            return false;
        }
    },

    getAllTodos: () => {
        return model.todoList.todos;
    },

    getOneTodoById: (id) => {
        return model.todoList.find(thisTodo => { return thisTodo.id === id; });
    },

    deletetodo: (todoIndex) => {
        model.todos.splice(todoIndex, 1);
        view.render();
    },

    getIndexById: (e) => {
        return this._todos.findIndex(thisTodo => {
            return thisTodo.id === id;
        });
    },

    updateTodo: (e) => {
        const indexToUpdate = this.getIndexById(todo.id);
        this._todos.splice(indexToUpdate, 1, todo);
    },

    deleteTodo: (todo) => {
        const indexToDelete = this.getIndexById(todo.id);
        this._todos.splice(indexToDelete, 1);
    }
}

controller.init()