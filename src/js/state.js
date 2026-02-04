import { getDataFromStorage, saveDataToStorage } from './storageService.js';
import { updateUI } from './updateUI.js';

let state = {
    data: getDataFromStorage()
};

function setState(newState) {
    state = {
        ...state,
        ...newState,
    }

    saveDataToStorage(state.data);
    updateUI();
};

export {
    state,
    setState
};