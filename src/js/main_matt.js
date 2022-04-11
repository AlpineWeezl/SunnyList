"use strict";
const newTaskForm = document.getElementById("newTodo");
const taskList = document.getElementById("todoList");
window.onload = loadTaskItems;

function createNewTask(id, taskName, taskDescription, taskDueDate, taskDone) {
    const newTaskItem = document.createElement("div");
    newTaskItem.setAttribute("id", `todoItem-${id}`);
    newTaskItem.setAttribute("class", "accordion-item");
    taskList.append(newTaskItem);
    newTaskItem.innerHTML = `
    <h2 class="accordion-header" id="heading-${id}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" name="accordion-button-${id}"
            data-bs-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">
            #${id}: ${taskName}
        </button>
    </h2>
    <div id="collapse-${id}" class="accordion-collapse collapse" aria-labelledby="heading-${id}"
        data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <form id="editForm-${id}">
                <div class="container">
                    <div class="row name-container">
                        <label for="taskName-${id}">Task Name</label>
                        <input type="text" name="taskName" id="taskName-${id}" value="${taskName}">
                    </div>
                    <div class="row">
                        <label for="dueDate-${id}">Deadline</label>
                        <input type="date" name="dueDate-${id}" id="taskDueDate-${id}" value="${taskDueDate}">
                    </div>
                    <div class="row">
                        <label for="description-${id}">Description</label>
                        <textarea name="description-${id}" id="taskDescription-${id}" cols="30" rows="10"
                            placeholder="Enter your description here">${taskDescription}</textarea>
                    </div>
                    <div class="row">
                        <div class="column">
                            <input type="checkbox" name="taskDone" id="taskDone-${id}">
                            <label for="taskDone-${id}">Task Done</label>
                        </div>
                    </div>
                    <div class="row id-container" hidden>
                        <label for="taskName-${id}">Task-Id</label>
                        <input type="text" name="taskName" id="taskName-${id}" value="${id}">
                    </div>
                    <div class="row">
                        <button type="submit" class="btn btn-success" name="edit" id="btnEdit-${id}"><i class="fa fa-save"
                                aria-hidden="true" name="editIcon" id="icoEdit-${id}"></i></button>
                        <button type="button" class="btn btn-danger" name="delete" id="btnEdit-${id}"><i
                                class="fa fa-trash" aria-hidden="true" name="icoDelete"></i></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `;
    if (taskDone) {
        document.getElementById(`taskDone-${id}`).checked = true;
    } else if (!taskDone) {
        document.getElementById(`taskDone-${id}`).checked = false;
    } else {
        document.getElementById(`taskDone-${id}`).checked = false;
        console.log('undefined status at taskDone');
    }
}

const handleCreateTask = (e) => {
    e.preventDefault();
    const newTaskName = document.getElementById("newTaskName").value;
    const id = getNewId();
    const itemToStore = [
        ["taskName", newTaskName],
        ["taskDescription", null],
        ["taskDueDate", ""],
        ["taskDone", false]
    ];
    localStorage.setItem(id, JSON.stringify(itemToStore));
    createNewTask(id, newTaskName, "", "");
    document.getElementById("newTaskName").value = "";
    storeItem(id, itemToStore);
};

function handleUpdateItem(e) {
    let taskId;
    if (e.target.name === 'edit') {
        const idName = e.target.id;
        taskId = idName.slice('btnEdit-'.length, idName.length);
    } else {
        const idName = e.target.id;
        taskId = idName.slice('icoEdit-'.length, idName.length);
    }
    const taskName = document.getElementById(`taskName-${taskId}`).value;
    const taskDueDate = document.getElementById(`taskDueDate-${taskId}`).value;
    const taskDescription = document.getElementById(`taskDescription-${taskId}`).value;
    const taskDone = document.getElementById(`taskDone-${taskId}`).checked;
    const itemToStore = [
        ["taskName", taskName],
        ["taskDescription", taskDescription],
        ["taskDueDate", taskDueDate],
        ["taskDone", taskDone]
    ];
    storeItem(taskId, itemToStore);
}

function storeItem(id, itemToStore) {
    console.log(itemToStore);
    localStorage.setItem(id, JSON.stringify(itemToStore));
}

function handleDeleteItem(e) {
    let taskId;
    let idName
    if (e.target.name === 'delete') {
        idName = e.target.id;
        taskId = idName.slice('btnDelete-'.length - 2, idName.length);
    } else {
        idName = e.target.id;
        taskId = idName.slice('icoDelete-'.length - 2, idName.length);
    }
    console.log(`Target Name: ${idName}`);
    console.log(`TaskID: ${taskId}`);
    const itemToDelete = document.getElementById(`taskItem-${taskId}`);
    itemToDelete.remove();
    localStorage.removeItem(`${taskId}`);
    console.log(e);
}

newTaskForm.addEventListener("submit", (e) => {
    handleCreateTask(e);
});

taskList.addEventListener("click", (e) => {
    e.preventDefault();
    let parentName;
    if (e.target.localName === 'i') {
        parentName = e.target.parentNode.name;
    }
    if (e.target.name === 'edit' || parentName === 'edit') {
        handleUpdateItem(e);
    } else if (e.target.name === 'delete' || parentName === 'delete') {
        handleDeleteItem(e);
    }
});

function loadTaskItems() {
    try {
        let maxId = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = parseInt(localStorage.key(i));
            if (key > maxId) {
                maxId = key;
            }
        }
        for (let i = 0; i < maxId; i++) {
            if (JSON.parse(localStorage.getItem(i)) != null) {
                const loadedItem = JSON.parse(localStorage.getItem(i));
                const taskName = loadedItem[0][1];
                const taskDescription = loadedItem[1][1];
                const taskDueDate = loadedItem[2][1];
                const taskDone = loadedItem[3][1];
                createNewTask(i, taskName, taskDescription, taskDueDate, taskDone)
            }
        }
    } catch (error) {
        console.log(error);
    }
}