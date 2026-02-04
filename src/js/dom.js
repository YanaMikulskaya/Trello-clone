const clockEl = document.querySelector('.header__clock');
const addTodoBtnEl = document.querySelector('#addTodoBtn');
const countTodoEl = document.querySelector('#countTodo');
const countInProgressEl = document.querySelector('#countInProgress');
const countDoneEl = document.querySelector('#countDone');
const listTodoEl = document.querySelector('#listTodo');
const listInProgressEl = document.querySelector('#listInProgress');
const listDoneEl = document.querySelector('#listDone');
const deleteAllBtnEl = document.querySelector('#deleteAll');

// modal
const addModalEl = document.querySelector('#addModal');
const formEl = document.querySelector('#form');
const cancelBtnEl = document.querySelector('#cancel');
const titleFormEl = document.querySelector('#modalTitle');
const descriptionEl = document.querySelector('#modalDescription');
const userSelectEl = document.querySelector('#modalUser');

// modal-confirm
const confirmModalEl = document.querySelector('#confirmModal');
const confirmDeleteBtnEl = document.querySelector('#confirmDeleteBtn');

export {
    clockEl,
    addTodoBtnEl,
    countTodoEl,
    countInProgressEl,
    countDoneEl,
    listTodoEl,
    listInProgressEl,
    listDoneEl,
    deleteAllBtnEl,
    formEl,
    cancelBtnEl,
    titleFormEl,
    descriptionEl,
    userSelectEl,
    confirmDeleteBtnEl,
    addModalEl,
    confirmModalEl
};