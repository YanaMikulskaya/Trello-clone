import Modal from 'bootstrap/js/dist/modal';
import { saveDataToStorage, getDataFromStorage } from './localStorage';
import { Todo } from './constructors';


const dataUser = ['Ivan', 'Yana', 'Tom', 'Dima'];
let modal = null;
let state = {
    data: getDataFromStorage()
}

function setState(newState) {
    state = {
        ...state,
        ...newState,
    }

    saveDataToStorage(state.data);
    //render(state.data)
    // updateCounter(state.data)
}

// handle
export function handleShowModal() {
    const modalEl = document.querySelector('#addModal');

    modal = new Modal(modalEl);
    modal.show();

    initUserSelect();

    const formEl = modalEl.querySelector('#form');
    formEl.addEventListener('submit', handleModalSubmit);
    const cancelBtnEl = formEl.querySelector('#cancel');
    cancelBtnEl.addEventListener('click', handleCanselSubmit);
};

function handleModalSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event
    const formData = new FormData(currentTarget);
    const todoFormData = Object.fromEntries(formData);

    const todo = new Todo(todoFormData);    
    const newData = structuredClone(state.data);
    newData.push(todo);

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

// helper
function initUserSelect() {
    const userSelect = document.querySelector('#modalUser');
    const firstOption = userSelect.options[0];
    let optionsHTML = '';
    dataUser.forEach((user) => {
        const userValue = user.toLowerCase();
        optionsHTML += `<option value="${userValue}">${user}</option>`;
    });
    userSelect.innerHTML = firstOption.outerHTML + optionsHTML;
};
