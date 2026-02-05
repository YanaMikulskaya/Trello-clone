import {
  listTodoEl,
  listInProgressEl,
  listDoneEl,
  countTodoEl,
  countInProgressEl,
  countDoneEl,
} from "./dom.js";
import { getTodosByStatus } from "./queries.js";
import { buildTodoTemplate } from "./templates.js";

// Рендерит все задачи, распределяя их по соответствующим колонкам
function renderTodos() {
  const htmlTodo = getTodosByStatus("todo").reduce(
    (acc, todo) => acc + buildTodoTemplate(todo),
    "",
  );
  listTodoEl.innerHTML = htmlTodo;

  const htmlInProgress = getTodosByStatus("inProgress").reduce(
    (acc, todo) => acc + buildTodoTemplate(todo),
    "",
  );
  listInProgressEl.innerHTML = htmlInProgress;

  const htmlDone = getTodosByStatus("done").reduce(
    (acc, todo) => acc + buildTodoTemplate(todo),
    "",
  );
  listDoneEl.innerHTML = htmlDone;
}

// Обновляет счетчики задач для каждого статуса
function updateCounters() {
  // Получаем количество задач для каждого статуса
  const countTodo = getTodosByStatus("todo").length;
  const countInProgress = getTodosByStatus("inProgress").length;
  const countDone = getTodosByStatus("done").length;

  // Обновляем текст в элементах счетчиков
  countTodoEl.textContent = countTodo;
  countInProgressEl.textContent = countInProgress;
  countDoneEl.textContent = countDone;
}

export function updateUI() {
  renderTodos();
  updateCounters();
}
