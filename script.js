let form = document.getElementById("taskModal");
let taskTitle = document.getElementById("taskTitle");
let taskDate = document.getElementById("taskDate");
let taskDesc = document.getElementById("taskDesc");
let errorMessage = document.getElementById("errorMessage");
let taskList = document.getElementById("taskList");
let saveTaskBtn = document.getElementById("saveTaskBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});

saveTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validateForm();
});

function validateForm() {
    if (taskTitle.value.trim() === "") {
        errorMessage.innerHTML = "Task cannot be empty!";
    } else {
        errorMessage.innerHTML = "";
        if (editingIndex !== null) {
            updateTask(editingIndex);
        } else {
            saveTask();
        }
        closeModal();
    }
}

function saveTask() {
    tasks.push({
        title: taskTitle.value.trim(),
        date: taskDate.value,
        description: taskDesc.value.trim(),
    });

    updateLocalStorage();
    renderTasks();
    resetForm();
}

function updateTask(index) {
    tasks[index] = {
        title: taskTitle.value.trim(),
        date: taskDate.value,
        description: taskDesc.value.trim(),
    };

    updateLocalStorage();
    renderTasks();
    resetForm();
    editingIndex = null;
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        taskList.innerHTML += `
        <div class="taskItem" id="${index}">
            <strong>${task.title}</strong>
            <small>${task.date}</small>
            <p>${task.description}</p>
            <div class="taskOptions">
                <i onClick="editTask(${index})" class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#taskModal"></i>
                <i onClick="deleteTask(${index})" class="fas fa-trash-alt"></i>
            </div>
        </div>`;
    });
}

function resetForm() {
    taskTitle.value = "";
    taskDate.value = "";
    taskDesc.value = "";
    errorMessage.innerHTML = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

function editTask(index) {
    let task = tasks[index];
    taskTitle.value = task.title;
    taskDate.value = task.date;
    taskDesc.value = task.description;
    editingIndex = index;
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function closeModal() {
    let modal = bootstrap.Modal.getInstance(form);
    modal.hide();
}

