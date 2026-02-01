import { updateCounters } from './counters.js';
import { listTodoEl, listInProgressEl, listDoneEl } from './dom.js';
import { updateCounters } from './counters.js';
import { getTodosByStatus } from './filter.js';
import { buildTodoTemplate } from './cards.js'

export function renderTodos() {
    const htmlTodo = getTodosByStatus('todo').reduce((acc, todo) => acc + buildTodoTemplate(todo), '');
    listTodoEl.innerHTML = htmlTodo;

    const htmlInProgress = getTodosByStatus('inProgress').reduce((acc, todo) => acc + buildTodoTemplate(todo), '');
    listInProgressEl.innerHTML = htmlInProgress;

    const htmlDone = getTodosByStatus('done').reduce((acc, todo) => acc + buildTodoTemplate(todo), '');
    listDoneEl.innerHTML = htmlDone;

    updateCounters();
};