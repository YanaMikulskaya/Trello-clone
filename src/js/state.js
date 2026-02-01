import { getDataFromStorage, saveDataToStorage } from './localStorage.js';
import { renderTodos } from './renderTodos.js';

export let state = {
    data: getDataFromStorage()
};

export function setState(newState) {
    state = {
        ...state,
        ...newState,
    }

    saveDataToStorage(state.data);
    renderTodos();
};