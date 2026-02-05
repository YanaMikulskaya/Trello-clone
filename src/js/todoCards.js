import { getIndexTodoById } from './todoQueries';
import { state, setState } from './state';
import { handleShowModal, handleShowModalConfirm } from './modals';

// Генерирует HTML-шаблон для отображения задачи
function buildTodoTemplate({ id, title, description, createdAt, status, user }) {
    // Определяем выбранные опции для select элемента
    const todoSelected = status === 'todo' ? 'selected' : '';
    const inProgressSelected = status === 'inProgress' ? 'selected' : '';
    const doneSelected = status === 'done' ? 'selected' : '';
    // Определяем класс фона карточки в зависимости от статуса
    let cardClass = 'bg-info-subtle'; // Значение по умолчанию

    switch (status) {
        case 'todo':
            cardClass = 'bg-info-subtle'; // Голубой для "сделать"
            break;
        case 'inProgress':
            cardClass = 'bg-warning-subtle'; // Желтый для "в процессе"
            break;
        case 'done':
            cardClass = 'bg-success-subtle'; // Зеленый для "выполнено"
            break;
    }

    // Генерация HTML разметки с использованием шаблонных строк
    return `
    <div class="card p-3 ${cardClass} d-flex gap-3 flex-row border-0" data-id="${id}">
        <div class="card__wrapp d-flex flex-column gap-2 flex-grow-1">
            <h4 class="card__title h5 text-capitalize">${title}</h4>
            <p class="card__description text-break text-capitalize">${description}</p>
            <p class="card__user m-0 mt-auto h6 text-capitalize">${user}</p>
        </div>
        <div class="card__wrapp d-flex flex-column gap-2 flex-shrink-0">
            <button class="card__btn btn btn-sm btn-light" type="button" data-role="edit">EDIT</button>
            <button class="card__btn btn btn-sm btn-light" type="button" data-role="delete">DELETE</button>
            <select class="card__select form-select form-select-sm" name="status" id="status${id}" data-role="status">
                <option value="todo" ${todoSelected}>TODO</option>
                <option value="inProgress" ${inProgressSelected}>IN PROGRESS</option>
                <option value="done" ${doneSelected}>DONE</option>
            </select>
            <span class="card__date mt-auto text-end">${createdAt}</span>
        </div>
    </div>`;
};

// handle for cards
// Обработчик кликов по карточке задачи (делегирование событий)
function handleClickTodo(event) {
    const { role } = event.target.dataset;

    // Обработка клика по кнопке удаления
    if (role === 'delete') {
        handleShowModalConfirm(event);
    }
    // Обработка клика по кнопке редактирования
    if (role === 'edit') {
        handleShowModal(event);
    };
};

// Обработчик изменения статуса задачи через select элемент
function handleChangeSelectStatus(event) {
    const { role } = event.target.dataset;
    if (role === 'status') {
        // Находим родительскую карточку задачи
        const todoEl = event.target.closest('.card');
        const id = todoEl.dataset.id;
        // Находим индекс задачи в массиве
        const indexTodo = getIndexTodoById(id);
        // Получаем новый выбранный статус
        const newStatus = event.target.value;
        // Создаем копию данных и обновляем статус
        const newData = structuredClone(state.data);
        newData[indexTodo].status = newStatus;

        // Обновляем состояние
        setState({
            data: newData,
        });
    };
};

export {
    buildTodoTemplate,
    handleClickTodo,
    handleChangeSelectStatus,
};