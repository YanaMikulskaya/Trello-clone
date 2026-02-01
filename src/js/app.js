import { createClock } from './createClock.js';
import { renderTodos } from './renderTodos.js';
import { addTodoBtnEl, listTodoEl, listInProgressEl, listDoneEl } from './dom.js'
import { handleShowModal } from './modal.js';
import { handleClickTodo, handleChangeSelectStatus } from './cards.js';
import { initUserSelect } from './users.js';

document.addEventListener('DOMContentLoaded', async () => {
    createClock();
    renderTodos();
    await initUserSelect();
});

addTodoBtnEl.addEventListener('click', handleShowModal);

listTodoEl.addEventListener('click', handleClickTodo);
listInProgressEl.addEventListener('click', handleClickTodo);
listDoneEl.addEventListener('click', handleClickTodo);

listTodoEl.addEventListener('change', handleChangeSelectStatus);
listInProgressEl.addEventListener('change', handleChangeSelectStatus);
listDoneEl.addEventListener('change', handleChangeSelectStatus);