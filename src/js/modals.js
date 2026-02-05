import Modal from 'bootstrap/js/dist/modal';
import { Todo } from './constructors.js';
import { getIndexTodoById } from './todoQueries.js';
import { setState, state } from './state.js';
import { deleteAllDone, deleteTodo } from './todoActions.js';
import { titleFormEl, descriptionEl, userSelectEl, formEl, confirmDeleteBtnEl, addModalEl, confirmModalEl } from './dom.js';

let modal = null;
let modalConfirm = null;

// Очищает состояние при закрытии модальных окон
function initModalHandlers() {
    addModalEl.addEventListener('hidden.bs.modal', () => {
        formEl.reset();
        delete formEl.dataset.editingId;
        modal = null;
    });

    confirmModalEl.addEventListener('hidden.bs.modal', () => {
        delete confirmDeleteBtnEl.dataset.deleteId;
        modalConfirm = null;
    });
}

initModalHandlers();

// handle
// Обработчик открытия модального окна для добавления/редактирования задачи
function handleShowModal(event) {
    const { role } = event.target.dataset;

    modal = new Modal('#addModal');
    modal.show();
    // Проверка режима работы (редактирование или добавление)
    if (role === 'edit') {
        // Режим редактирования: заполнение формы данными задачи
        const todoEl = event.target.closest('.card');
        const id = todoEl.dataset.id;
        const indexTodo = getIndexTodoById(id);
        const todo = state.data[indexTodo];

        titleFormEl.value = todo.title;
        descriptionEl.value = todo.description;
        userSelectEl.value = todo.user;
        formEl.dataset.editingId = id;
    } else {
        // Режим добавления: сброс формы
        formEl.reset();
        delete formEl.dataset.editingId;
    }
};

// Обработчик отправки формы
function handleModalSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const editingId = currentTarget.dataset.editingId;

    // Получение данных из формы
    const formData = new FormData(currentTarget);
    const todoFormData = Object.fromEntries(formData);
    const newData = structuredClone(state.data);

    if (editingId) {
        // Обновление существующей задачи
        const index = getIndexTodoById(editingId);
        newData[index] = new Todo({
            ...newData[index],
            ...todoFormData,
            id: editingId
        });
        delete currentTarget.dataset.editingId;
    } else {
        // Создание новой задачи
        const todo = new Todo(todoFormData);
        newData.push(todo);
    }
    // Обновление состояния
    setState({
        data: newData,
    });

    // Сброс фокуса, очистка формы и закрытие модального окна
    document.activeElement?.blur();
    currentTarget.reset();
    modal.hide();
    modal = null;
};
// Обработчик отмены добавления/редактирования задачи
function handleCanselSubmit(event) {
    event.preventDefault();
    const { target } = event;

    if (target.id === 'cancel') {
        // Закрытие модального окна с очисткой данных
        const form = target.closest('.modal__form');
        delete form.dataset.editingId;

        document.activeElement?.blur();
        form.reset();
        modal.hide();
        modal = null;
    }
};

// Обработчик открытия модального окна подтверждения удаления
function handleShowModalConfirm(event) {
    const { role } = event.target.dataset;

    modalConfirm = new Modal('#confirmModal');
    modalConfirm.show();

    // Определение типа удаления
    if (role === 'delete') {
        // Удаление конкретной задачи
        const todoEl = event.target.closest('.card');
        const id = todoEl.dataset.id;
        confirmDeleteBtnEl.dataset.deleteId = id;
    } else if (role === 'deleteAll') {
        // Удаление всех выполненных задач
        delete confirmDeleteBtnEl.dataset.deleteId;
    }
};

// Обработчик подтверждения удаления
function handleClickConfirm(event) {
    const { currentTarget } = event
    const deleteId = currentTarget.dataset.deleteId;

    if (deleteId) {
        // Удаление одной задачи
        deleteTodo(deleteId);
    } else {
        // Удаление всех выполненных задач
        deleteAllDone();
    }

    // Закрытие модального окна с очисткой данных
    document.activeElement?.blur();
    delete currentTarget.dataset.deleteId;
    modalConfirm.hide();
    modalConfirm = null;
};

export {
    handleShowModal,
    handleModalSubmit,
    handleCanselSubmit,
    handleShowModalConfirm,
    handleClickConfirm
};
