import { state } from './state.js';

function getTodosByStatus(status) {
    return state.data.filter(todo => todo.status === status);
};

function getIndexTodoById(id) {
    return state.data.findIndex((todo) => todo.id === id);
};

function getActiveTodos() {
    return state.data.filter(todo => todo.status !== 'done');
};

export {
    getIndexTodoById,
    getTodosByStatus,
    getActiveTodos,      
};