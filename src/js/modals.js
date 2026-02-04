import Modal from 'bootstrap/js/dist/modal';
import { Todo } from './constructors.js';
import { getIndexTodoById } from './todoQueries.js';
import { setState, state } from './state.js';
import { deleteAllDone, deleteTodo } from './todoActions.js';
import { titleFormEl, descriptionEl, userSelectEl, formEl, confirmDeleteBtnEl, addModalEl, confirmModalEl } from './dom.js';

let modal = null;
let modalConfirm = null;

function initModalHandlers() {
    addModalEl.addEventListener('hidden.bs.modal', () => {
        formEl.reset();
        delete formEl.dataset.editingId;
        modal = null;
    });

    confirmModalEl.addEventListener('hidden.bs.modal', () => {
        delete confirmDeleteBtnEl.dataset.deleteId;
        delete confirmDeleteBtnEl.dataset.actionRole;
        modalConfirm = null;
    });
}

initModalHandlers();

// handle
function handleShowModal(event) {
    const { role } = event.target.dataset;

    modal = new Modal('#addModal');
    modal.show();

    if (role === 'edit') {
        const todoEl = event.target.closest('.card');
        const id = todoEl.dataset.id;
        const indexTodo = getIndexTodoById(id);
        const todo = state.data[indexTodo];

        titleFormEl.value = todo.title;
        descriptionEl.value = todo.description;
        userSelectEl.value = todo.user;
        formEl.dataset.editingId = id;
    } else {
        formEl.reset();
        delete formEl.dataset.editingId;
    }
};

function handleModalSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const editingId = currentTarget.dataset.editingId;

    const formData = new FormData(currentTarget);
    const todoFormData = Object.fromEntries(formData);
    const newData = structuredClone(state.data);

    if (editingId) {
        const index = getIndexTodoById(editingId);
        newData[index] = new Todo({
            ...newData[index],
            ...todoFormData,
            id: editingId
        });
        delete currentTarget.dataset.editingId;
    } else {
        const todo = new Todo(todoFormData);
        newData.push(todo);
    }

    setState({
        data: newData,
    });

    document.activeElement?.blur();
    currentTarget.reset();
    modal.hide();
    modal = null;
};

function handleCanselSubmit(event) {
    event.preventDefault();
    const { target } = event;

    if (target.id === 'cancel') {
        const form = target.closest('.modal__form');
        delete form.dataset.editingId;

        document.activeElement?.blur();
        form.reset();
        modal.hide();
        modal = null;
    }
};

function handleShowModalConfirm(event) {
    const { role } = event.target.dataset;

    modalConfirm = new Modal('#confirmModal');
    modalConfirm.show();

    if (role === 'delete') {
        const todoEl = event.target.closest('.card');
        const id = todoEl.dataset.id;
        confirmDeleteBtnEl.dataset.deleteId = id;
    } else if (role === 'deleteAll') {
        delete confirmDeleteBtnEl.dataset.deleteId;
    }
};

function handleClickConfirm(event) {
    const { currentTarget } = event
    const deleteId = currentTarget.dataset.deleteId;

    if (deleteId) {
        deleteTodo(deleteId);
    } else {
        deleteAllDone();
    }

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
