import {countTodoEl, countInProgressEl, countDoneEl} from './dom.js';
import { getTodosByStatus } from './filter.js';

export function updateCounters() {
    const countTodo = getTodosByStatus('todo').length;
    const countInProgress = getTodosByStatus('inProgress').length;
    const countDone = getTodosByStatus('done').length;

    countTodoEl.textContent = countTodo;
    countInProgressEl.textContent = countInProgress;
    countDoneEl.textContent = countDone;
};