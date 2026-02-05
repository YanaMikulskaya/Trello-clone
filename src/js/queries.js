import { state } from "./state.js";

// Фильтрует задачи по указанному статусу
function getTodosByStatus(status) {
  return state.data.filter((todo) => todo.status === status);
}

// Находит индекс задачи в массиве по её уникальному идентификатору
function getIndexTodoById(id) {
  return state.data.findIndex((todo) => todo.id === id);
}

// Фильтруе все активные (не выполненные) задачи
function getActiveTodos() {
  return state.data.filter((todo) => todo.status !== "done");
}

export { getIndexTodoById, getTodosByStatus, getActiveTodos };
