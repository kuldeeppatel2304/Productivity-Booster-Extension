
// To-Do List Functionality
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from storage
function loadTasks() {
  chrome.storage.local.get("tasks", (data) => {
    if (data.tasks) {
      data.tasks.forEach((task) => {
        addTaskToDOM(task.text, task.completed);
      });
    }
  });
}

// Save tasks to storage
function saveTasks() {
  const tasks = Array.from(taskList.children).map((li) => ({
    text: li.querySelector(".task-text").textContent,
    completed: li.classList.contains("completed"),
  }));
  chrome.storage.local.set({ tasks });
}

// Add task to DOM
function addTaskToDOM(taskText, isCompleted = false) {
  const listItem = document.createElement("li");
  if (isCompleted) listItem.classList.add("completed");

  const taskSpan = document.createElement("span");
  taskSpan.className = "task-text";
  taskSpan.textContent = taskText;
  taskSpan.addEventListener("click", () => {
    listItem.classList.toggle("completed");
    saveTasks();
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    listItem.remove();
    saveTasks();
  });

  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);
}

// Add new task
addTaskButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    addTaskToDOM(task);
    saveTasks();
    taskInput.value = "";
  }
});

// Initial load

loadTasks();
