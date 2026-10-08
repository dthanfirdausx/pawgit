import "./style.css";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = "pawgit-tasks";

const form = getElement<HTMLFormElement>("task-form");
const input = getElement<HTMLInputElement>("task-input");
const taskList = getElement<HTMLUListElement>("task-list");
const emptyState = getElement<HTMLParagraphElement>("empty-state");
const clearCompletedButton = getElement<HTMLButtonElement>("clear-completed");
const totalCount = getElement<HTMLElement>("total-count");
const completedCount = getElement<HTMLElement>("completed-count");
const progressValue = getElement<HTMLElement>("progress-value");
const progressCircle = getElement<HTMLElement>("progress-circle");
const progressCopy = getElement<HTMLElement>("progress-copy");
const today = getElement<HTMLElement>("today");

let tasks: Task[] = loadTasks();

today.textContent = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(new Date());

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    completed: false,
  });

  input.value = "";
  saveAndRender();
  input.focus();
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveAndRender();
});

function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Elemen dengan id "${id}" tidak ditemukan.`);
  }

  return element as T;
}

function loadTasks(): Task[] {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) {
    return [
      {
        id: crypto.randomUUID(),
        title: "Pelajari tipe data dasar TypeScript",
        completed: true,
      },
      {
        id: crypto.randomUUID(),
        title: "Buat mini project pertama",
        completed: false,
      },
    ];
  }

  try {
    return JSON.parse(savedTasks) as Task[];
  } catch {
    return [];
  }
}

function saveAndRender(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  render();
}

function toggleTask(id: string): void {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  saveAndRender();
}

function deleteTask(id: string): void {
  tasks = tasks.filter((task) => task.id !== id);
  saveAndRender();
}

function render(): void {
  taskList.replaceChildren();

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " is-completed" : ""}`;

    const label = document.createElement("label");
    label.className = "task-check";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Tandai ${task.title} sebagai selesai`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const title = document.createElement("span");
    title.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Hapus";
    deleteButton.setAttribute("aria-label", `Hapus ${task.title}`);
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    label.append(checkbox, title);
    item.append(label, deleteButton);
    taskList.append(item);
  });

  updateSummary();
}

function updateSummary(): void {
  const completed = tasks.filter((task) => task.completed).length;
  const percentage = tasks.length === 0
    ? 0
    : Math.round((completed / tasks.length) * 100);

  totalCount.textContent = String(tasks.length);
  completedCount.textContent = String(completed);
  progressValue.textContent = `${percentage}%`;
  progressCircle.style.setProperty("--progress", `${percentage * 3.6}deg`);
  emptyState.hidden = tasks.length > 0;
  clearCompletedButton.disabled = completed === 0;

  if (percentage === 100 && tasks.length > 0) {
    progressCopy.textContent = "Hebat! Semua kegiatan sudah selesai.";
  } else if (percentage >= 50) {
    progressCopy.textContent = "Sedikit lagi, pertahankan ritmemu!";
  } else {
    progressCopy.textContent = "Mulai dari satu kegiatan kecil.";
  }
}

render();
