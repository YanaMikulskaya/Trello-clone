import Modal from 'bootstrap/js/dist/modal';
import { Todo } from './constructors.js';
import { getIndexTodoById } from './filter.js';
import { setState, state } from './state.js';

let modal = null;

// handle
export function handleShowModal(event) {
    const { role } = event.target.dataset;

    const modalEl = document.querySelector('#addModal');

    modal = new Modal(modalEl);
    modal.show();
    
    const formEl = modalEl.querySelector('#form');
    formEl.addEventListener('submit', handleModalSubmit);
    const cancelBtnEl = formEl.querySelector('#cancel');
    cancelBtnEl.addEventListener('click', handleCanselSubmit);

    if (role === 'edit') {
        const todoEl = event.target.closest('.card');
        const id = todoEl.dataset.id;
        const indexTodo = getIndexTodoById(id);
        const todo = state.data[indexTodo];

        const titleFormEl = modalEl.querySelector('#modalTitle');
        titleFormEl.value = todo.title;
        const descriptionEl = modalEl.querySelector('#modalDescription');
        descriptionEl.value = todo.description;
        const userSelectEl = modalEl.querySelector('#modalUser');
        userSelectEl.value = todo.user;

        formEl.dataset.editingId = id;
    }
};

function handleModalSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event

    const formData = new FormData(currentTarget);
    const todoFormData = Object.fromEntries(formData);
    const editingId = currentTarget.dataset.editingId;
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

    currentTarget.reset();
    modal.hide();
};

function handleCanselSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const form = target.closest('.modal__form');
    if (target.id === 'cancel') {
        form.reset();
        modal.hide();
    }
};
