let todoItems = [];
const categories = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E', 'Category F'];


function renderTodo(todo) {
localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
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

const isChecked = todo.checked ? 'done': '';
const checkboxChecked = todo.checked ? 'checked': '';
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
                                        ${categories.forEach((b) =>  {`<option>${b}</option>`;})}
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


function addToDo(text)  {
    const toDoObj = {
        text,
        description: "Description",
        checked: false,
        categories: [],
        createdDate: getCurrentDate(Date.now),
        dueDate: "",
        image: "",
        id: Date.now()
    }
    todoItems.push(toDoObj);
    renderTodo(toDoObj);
}

function getCurrentDate() {
const date = new Date();
// Hours part from the timestamp
const year = date.getFullYear();
// Minutes part from the timestamp
const month = (date.getMonth() -1);
// Seconds part from the timestamp
const day = date.getDay();
const currentDate = day + "." + month + "." + year;
return currentDate;
}

function toggleDone(key) {
    // findIndex is an array method that returns the position of an element
    // in the array.
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Locate the todo item in the todoItems array and set its checked
    // property to the opposite. That means, `true` will become `false` and vice
    // versa.
    todoItems[index].checked = !todoItems[index].checked;
    console.log(todoItems[index]);
    renderTodo(todoItems[index]);
  }

  function deleteTodo(key) {
    // find the corresponding todo object in the todoItems array
    const index = todoItems.findIndex(item => item.id === Number(key));
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

  function editToDo(key) {
    // find the corresponding todo object in the todoItems array
    const index = todoItems.findIndex(item => item.id === Number(key));
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

form.addEventListener('submit', event =>    {
    event.preventDefault();
    const input = document.querySelector('#taskName');

    const text = input.value.trim();
    if(text !== "") {
        addToDo(text);
        input.value = "";
        input.focus();
    }
})

// Select the entire list
const list = document.querySelector('#accordionExample');
// Add a click event listener to the list and its children
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
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

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
  });