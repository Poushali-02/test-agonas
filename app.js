// Agonas To-Do: deliberately small. State lives in a module-level array and the
// whole list is re-rendered on every change.
let tasks = [];
let nextId = 1;

const form = document.getElementById("add-form");
const input = document.getElementById("new-task");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");

function addTask(text) {
  tasks.push({ id: nextId++, text: text.trim(), done: false });
  render();
}

function toggleTask(id) {
  const t = tasks.find((t) => t.id === id);
  if (t) t.done = !t.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function render() {
  list.innerHTML = "";
  for (const t of tasks) {
    const li = document.createElement("li");
    li.className = "task" + (t.done ? " done" : "");
    li.innerHTML = `
      <input type="checkbox" id="t${t.id}" ${t.done ? "checked" : ""}>
      <label for="t${t.id}"></label>
      <button class="delete" aria-label="Delete task">&times;</button>`;
    li.querySelector("label").textContent = t.text;
    li.querySelector("input").addEventListener("change", () => toggleTask(t.id));
    li.querySelector(".delete").addEventListener("click", () => deleteTask(t.id));
    list.appendChild(li);
  }
  const left = tasks.filter((t) => !t.done).length;
  counter.textContent = tasks.length ? `${left} of ${tasks.length} tasks left` : "No tasks yet.";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) addTask(input.value);
  input.value = "";
  input.focus();
});

render();
