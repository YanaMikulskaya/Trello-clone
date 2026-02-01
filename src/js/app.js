import { createClock } from './createClock.js';
import { renderTodos } from './renderTodos.js';
import { addTodoBtnEl, listTodoEl, listInProgressEl, listDoneEl } from './dom.js'
import { handleShowModal} from './modal.js';
import { handleClickTodo, handleChangeSelectStatus } from './cards.js';

createClock();
renderTodos();

addTodoBtnEl.addEventListener('click', handleShowModal);

listTodoEl.addEventListener('click', handleClickTodo);
listInProgressEl.addEventListener('click', handleClickTodo);
listDoneEl.addEventListener('click', handleClickTodo);

listTodoEl.addEventListener('change', handleChangeSelectStatus);
listInProgressEl.addEventListener('change', handleChangeSelectStatus);
listDoneEl.addEventListener('change', handleChangeSelectStatus);