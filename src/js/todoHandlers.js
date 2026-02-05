import { getIndexTodoById } from "./queries.js";
import { state, setState } from "./state";
import {
  handleShowModal,
  handleShowModalConfirm,
  showModalLimit,
} from "./modalHandlers.js";
import { validateInProgressLimit } from "./validators.js";

// Обработчик кликов по карточке задачи (делегирование событий)
function handleClickTodo(event) {
  const { role } = event.target.dataset;

  // Обработка клика по кнопке удаления
  if (role === "delete") {
    handleShowModalConfirm(event);
  }
  // Обработка клика по кнопке редактирования
  if (role === "edit") {
    handleShowModal(event);
  }
}

// Обработчик изменения статуса задачи через select элемент
function handleChangeSelectStatus(event) {
  const { role } = event.target.dataset;
  if (role === "status") {
    // Находим родительскую карточку задачи
    const todoEl = event.target.closest(".card");
    const id = todoEl.dataset.id;
    // Находим индекс задачи в массиве
    const indexTodo = getIndexTodoById(id);
    // Получаем текущий статус задачи
    const currentStatus = state.data[indexTodo].status;
    // Получаем новый выбранный статус
    const newStatus = event.target.value;

    // прерываем выполнение функции, если статус не меняется
    if (newStatus === currentStatus) return;

    // Проверяем лимит при переходе в "inProgress"
    if (newStatus === "inProgress" && !validateInProgressLimit()) {
      showModalLimit();
      event.target.value = currentStatus;
      return;
    }

    // Создаем копию данных и обновляем статус
    const newData = structuredClone(state.data);
    newData[indexTodo].status = newStatus;

    // Обновляем состояние
    setState({
      data: newData,
    });
  }
}

export { handleClickTodo, handleChangeSelectStatus };
