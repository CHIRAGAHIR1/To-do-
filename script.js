let form = document.getElementById("taskModal");
let taskTitle = document.getElementById("taskTitle");
let taskDate = document.getElementById("taskDate");
let taskDesc = document.getElementById("taskDesc");
let errorMessage = document.getElementById("errorMessage");
let taskList = document.getElementById("taskList");
let saveTaskBtn = document.getElementById("saveTaskBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingIndex = null; // Track task being edited

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});

// Click event for Save button (Add or Edit)
saveTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validateForm();
});

// Validate form inputs
function validateForm() {
    if (taskTitle.value.trim() === "") {
        // errorMessage.innerHTML = "Task cannot be empty!";
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

// Save new task
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

// Update task (Edit functionality)
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

// Render tasks in the list
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

// Reset form fields
function resetForm() {
    taskTitle.value = "";
    taskDate.value = "";
    taskDesc.value = "";
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

// Edit task - Opens Modal and Loads Task Data
function editTask(index) {
    let task = tasks[index];
    taskTitle.value = task.title;
    taskDate.value = task.date;
    taskDesc.value = task.description;
    editingIndex = index;
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Close modal after saving/updating task
function closeModal() {
    saveTaskBtn.setAttribute("data-bs-dismiss", "modal");
    saveTaskBtn.click();
    setTimeout(() => {
        saveTaskBtn.removeAttribute("data-bs-dismiss");
    }, 100);
}
