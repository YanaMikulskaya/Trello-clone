import { getIndexTodoById, getActiveTodos } from "./queries.js";
import { setState, state } from "./state.js";

// Удаляет задачу по id
function deleteTodo(id) {
  // Находим индекс задачи в массиве по её id
  const indexTodo = getIndexTodoById(id);
  // Создаем глубокую копию текущих данных
  const newData = structuredClone(state.data);
  // Удаляем задачу из копии массива по найденному индексу
  newData.splice(indexTodo, 1);

  // Обновляем состояние приложения
  setState({
    data: newData,
  });
}

//  Удаляет все выполненные задачи (статус 'done')
function deleteAllDone() {
  // Получаем новый массив, содержащий только НЕ выполненные задачи
  const newData = getActiveTodos();
  // Обновляем состояние приложения
  setState({
    data: newData,
  });
}

export { deleteTodo, deleteAllDone };
