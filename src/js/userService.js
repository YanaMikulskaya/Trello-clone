async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (String(response.status).startsWith(4) || String(response.status).startsWith(5)) {
            throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
};

async function getUsersData() {
    const usersData = await fetchUsers();
    const userNames = usersData.map(user => user.name);   
    return userNames;
};

export async function initUserSelect() {
    const userSelect = document.querySelector('#modalUser');
    const firstOption = userSelect.options[0];

    const dataUser = await getUsersData();
    let optionsHTML = '';

    dataUser.forEach((user) => {
        const userValue = user.toLowerCase().replace(/\s+/g, '-');
        optionsHTML += `<option value="${userValue}">${user}</option>`;
    });
    userSelect.innerHTML = firstOption.outerHTML + optionsHTML;
};