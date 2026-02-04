import { listTodoEl, listInProgressEl, listDoneEl, countTodoEl, countInProgressEl, countDoneEl } from './dom.js';
import { getTodosByStatus } from './todoQueries.js';
import { buildTodoTemplate } from './todoCards.js';

function renderTodos() {
    const htmlTodo = getTodosByStatus('todo').reduce((acc, todo) => acc + buildTodoTemplate(todo), '');
    listTodoEl.innerHTML = htmlTodo;

    const htmlInProgress = getTodosByStatus('inProgress').reduce((acc, todo) => acc + buildTodoTemplate(todo), '');
    listInProgressEl.innerHTML = htmlInProgress;

    const htmlDone = getTodosByStatus('done').reduce((acc, todo) => acc + buildTodoTemplate(todo), '');
    listDoneEl.innerHTML = htmlDone;
};

function updateCounters() {
    const countTodo = getTodosByStatus('todo').length;
    const countInProgress = getTodosByStatus('inProgress').length;
    const countDone = getTodosByStatus('done').length;

    countTodoEl.textContent = countTodo;
    countInProgressEl.textContent = countInProgress;
    countDoneEl.textContent = countDone;
};

export function updateUI() {
    renderTodos();
    updateCounters();
}