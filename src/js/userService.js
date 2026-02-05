// Асинхронно получает список пользователей с внешнего API
async function fetchUsers() {
    try {
        // Выполняем GET запрос к API JSONPlaceholder
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        // Проверяем статус ответа
        if (String(response.status).startsWith(4) || String(response.status).startsWith(5)) {
            // Создаем информативную ошибку с кодом и текстом статуса
            throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        // Парсим JSON ответ в JavaScript объекты
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
};

// Извлекает имена пользователей из полученных данных
async function getUsersData() {
    // Получаем полные данные о пользователях
    const usersData = await fetchUsers();
    // Извлекаем только имена пользователей
    const userNames = usersData.map(user => user.name);
    return userNames;
};

// Инициализирует select элемент с опциями пользователей
export async function initUserSelect() {
    // Находим select элемент в DOM по id
    const userSelect = document.querySelector('#modalUser');
    // Сохраняем первую опцию
    const firstOption = userSelect.options[0];

    // Получаем массив имен пользователей
    const dataUser = await getUsersData();
    let optionsHTML = '';
    // Генерируем HTML для каждой опции select
    dataUser.forEach((user) => {
        const userValue = user.toLowerCase().replace(/\s+/g, '-');
        optionsHTML += `<option value="${userValue}">${user}</option>`;
    });

    // Восстанавливаем первую опцию и добавляем сгенерированные
    userSelect.innerHTML = firstOption.outerHTML + optionsHTML;
};