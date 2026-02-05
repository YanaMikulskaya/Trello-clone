import { getDataFromStorage, saveDataToStorage } from './storageService.js';
import { updateUI } from './updateUI.js';

// Хранит данные о задачах и их текущем состоянии
let state = {
    data: getDataFromStorage()
};

// Функция для обновления состояния приложения
function setState(newState) {
    // Создается новый объект состояния с объединением текущих и новых данных
    state = {
        ...state,
        ...newState,
    }

    // Сохраняем данные в localStorage
    saveDataToStorage(state.data);
    // Обновляем пользовательский интерфейс
    updateUI();
};

export {
    state,
    setState
};