import {
  addTodoBtnEl,
  listTodoEl,
  listInProgressEl,
  listDoneEl,
  deleteAllBtnEl,
  formEl,
  cancelBtnEl,
  confirmDeleteBtnEl,
} from "./dom.js";
import {
  handleShowModal,
  handleShowModalConfirm,
  handleModalSubmit,
  handleCanselSubmit,
  handleClickConfirm,
} from "./modalHandlers.js";
import { handleClickTodo, handleChangeSelectStatus } from "./todoHandlers.js";

// Добавление обработсиков событий
export function initEventListeners() {
  // Кнопки действий
  addTodoBtnEl.addEventListener("click", handleShowModal);
  deleteAllBtnEl.addEventListener("click", handleShowModalConfirm);

  // Колонки с задачами
  const columns = [listTodoEl, listInProgressEl, listDoneEl];
  columns.forEach((column) => {
    column.addEventListener("click", handleClickTodo);
    column.addEventListener("change", handleChangeSelectStatus);
  });
  // Форма добавления/редактирования
  formEl.addEventListener("submit", handleModalSubmit);
  cancelBtnEl.addEventListener("click", handleCanselSubmit);

  // Кнопка подтверждения удаления
  confirmDeleteBtnEl.addEventListener("click", handleClickConfirm);
}
