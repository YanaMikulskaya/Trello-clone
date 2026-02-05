// Ключ для хранения данных в localStorage
const TODOS_STORAGE_KEY = 'todos';

// Сохраняет данные задач в localStorage
function saveDataToStorage(data) {
    // Преобразуем массив объектов в JSON строку
    const dataJson = JSON.stringify(data);
    // Сохраняем строку в localStorage под заданным ключом
    localStorage.setItem(TODOS_STORAGE_KEY, dataJson);
};

// Загружает данные задач из localStorage
function getDataFromStorage() {
    // Получаем JSON строку из localStorage по ключу
    const dataJson = localStorage.getItem(TODOS_STORAGE_KEY);
    // парсим JSON в массив объектов или возвращаем пустой массив
    return dataJson ? JSON.parse(dataJson) : [];
};

export {
    saveDataToStorage,
    getDataFromStorage
};