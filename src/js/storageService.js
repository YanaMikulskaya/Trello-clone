const TODOS_STORAGE_KEY = 'todos';

function saveDataToStorage(data) {
    const dataJson = JSON.stringify(data);
    localStorage.setItem(TODOS_STORAGE_KEY, dataJson);
};


function getDataFromStorage() {
    const dataJson = localStorage.getItem(TODOS_STORAGE_KEY);
    return dataJson ? JSON.parse(dataJson) : [];
};

export {
    saveDataToStorage,
    getDataFromStorage
};