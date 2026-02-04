import { getIndexTodoById, getActiveTodos } from './todoQueries.js';
import { setState, state } from './state.js';

function deleteTodo(id) {
    const indexTodo = getIndexTodoById(id);
    const newData = structuredClone(state.data);
    newData.splice(indexTodo, 1);

    setState({
        data: newData,
    });
};

function deleteAllDone() {
    const newData = getActiveTodos();
    setState({
        data: newData,
    });
};

export {    
    deleteTodo,
    deleteAllDone 
};