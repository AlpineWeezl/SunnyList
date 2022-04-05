"use strict";
const newTaskForm = document.getElementById("newTask");
const taskList = document.getElementById("taskList");

const handleCreateTask = (e) => {
  e.preventDefault();
  const newTaskName = document.getElementById("newTaskName").value;
  const id = 0;
  const storageItem = [
    ["taskName", newTaskName],
    ["taskDescription", "TestDescription"],
  ];
  localStorage.setItem(id, JSON.stringify(storageItem));
  const newTaskItem = document.createElement("div");
  newTaskItem.setAttribute("id", `taskItem-${id}`);
  newTaskItem.setAttribute("class", "accordion-item");
  newTaskItem.innerHTML = `
                    <h2 class="accordion-header" id="heading-${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse-${id}" aria-expanded="false" aria-controls="collapse-${id}">
                            #${id}: ${newTaskName}
                        </button>
                    </h2>
                    <div id="collapse-${id}" class="accordion-collapse collapse" aria-labelledby="heading-${id}"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <form id="editForm-${id}">
                                <div class="container">
                                    <div class="row">
                                        <label for="date-${id}">Deadline</label>
                                        <input type="date" name="date-${id}" id="date-${id}"> <br>
                                    </div>
                                    <div class="row">
                                        <label for="description-${id}">Description</label>
                                        <textarea name="description-${id}" id="description-${id}" cols="30" rows="10"
                                            placeholder="Enter your description here"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    `;
  taskList.append(newTaskItem);
  document.getElementById("newTaskName").value = "";
};

const newTask = newTaskForm.addEventListener("submit", handleCreateTask);
