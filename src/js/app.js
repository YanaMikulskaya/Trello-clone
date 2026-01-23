import { createClock, } from './createClock.js';
import { addTodoBtnEl } from './dom.js'
import { handleShowModal } from './modal.js';

createClock();

addTodoBtnEl.addEventListener('click', handleShowModal);









