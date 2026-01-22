document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input-group input");
  const addBtn = document.querySelector(".input-group button");
  const tasksDiv = document.querySelector(".tasks");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  addBtn.addEventListener("click", addTask);

  function addTask() {
    const text = input.value.trim();
    if (text === "") return;

    const task = {
      id: Date.now(),
      text,
      completed: false
    };

    tasks.push(task);
    input.value = "";
    saveAndRender();
  }

  function renderTasks() {
    tasksDiv.innerHTML = "";

    tasks.forEach(task => {
      const row = document.createElement("div");
      row.className = "task-row";

      const left = document.createElement("div");
      left.className = "left";

      const checkBox = document.createElement("div");
      checkBox.className = "check-box";
      if (task.completed) checkBox.classList.add("active");
      checkBox.innerHTML = task.completed ? "✔" : "";

      checkBox.addEventListener("click", () => toggleTask(task.id));

      const span = document.createElement("span");
      span.textContent = task.text;
      if (task.completed) span.classList.add("completed");

      left.appendChild(checkBox);
      left.appendChild(span);

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => removeTask(task.id));

      row.appendChild(left);
      row.appendChild(removeBtn);

      tasksDiv.appendChild(row);
    });
  }

  function toggleTask(id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveAndRender();
  }

  function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
  }

  function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  renderTasks();
});
