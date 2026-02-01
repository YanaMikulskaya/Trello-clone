import { getIndexTodoById } from './filter';
import { state, setState } from './state';
import { handleShowModal, handleShowModalConfirm } from './modals';

// HTML card
function buildTodoTemplate({ id, title, description, createdAt, status, user }) {
    const todoSelected = status === 'todo' ? 'selected' : '';
    const inProgressSelected = status === 'inProgress' ? 'selected' : '';
    const doneSelected = status === 'done' ? 'selected' : '';
    let cardClass = 'bg-info-subtle';

    switch (status) {
        case 'todo':
            cardClass = 'bg-info-subtle';
            break;
        case 'inProgress':
            cardClass = 'bg-warning-subtle';
            break;
        case 'done':
            cardClass = 'bg-success-subtle';
            break;
    }

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
function handleClickTodo(event) {
    const { role } = event.target.dataset;
    if (role === 'delete') {
        handleShowModalConfirm(event);
    }
    if (role === 'edit') {
        handleShowModal(event);
    };
};

function handleChangeSelectStatus(event) {
    const { role } = event.target.dataset;
    if (role === 'status') {
        const todoEl = event.target.closest('.card');
        const id = todoEl.dataset.id;
        const indexTodo = getIndexTodoById(id);
        const newStatus = event.target.value;
        const newData = structuredClone(state.data);
        newData[indexTodo].status = newStatus;

        setState({
            data: newData,
        });
    };
};

function deleteTodo(id) {
    const indexTodo = getIndexTodoById(id);
    const newData = structuredClone(state.data);
    newData.splice(indexTodo, 1);

    setState({
        data: newData,
    });
};

function deleteAll() {
    const newData = state.data.filter(todo => todo.status !== 'done');
    setState({
        data: newData,
    });
}

export {
    buildTodoTemplate,
    handleClickTodo,
    handleChangeSelectStatus,
    deleteTodo,
    deleteAll
};