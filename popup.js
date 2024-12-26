// To-Do List Functionality
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");



addTaskButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    taskList.appendChild(listItem);
    taskInput.value = "";
    saveTasks();
  }
});

function saveTasks() {
  const tasks = Array.from(taskList.children).map(li => li.textContent);
  chrome.storage.local.set({ tasks });
}

function loadTasks() {
  chrome.storage.local.get("tasks", (data) => {
    if (data.tasks) {
      data.tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.textContent = task;
        taskList.appendChild(listItem);
      });
    }
  });
}

loadTasks();

// Reminder Functionality
const reminderTime = document.getElementById("reminder-time");
const setReminderButton = document.getElementById("set-reminder");

setReminderButton.addEventListener("click", () => {
  const time = new Date(reminderTime.value).getTime();
  if (time) {
    chrome.alarms.create("reminder", { when: time });
    alert("Reminder set!");
  }
});

// Google Calendar Integration (Placeholder for OAuth Setup)
const syncCalendarButton = document.getElementById("sync-calendar");
syncCalendarButton.addEventListener("click", () => {
  alert("Google Calendar integration coming soon!");
});

