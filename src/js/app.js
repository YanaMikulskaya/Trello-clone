import { createClock } from './createClock.js';
import { updateUI } from './updateUI.js';
import { initEventListeners } from './listeners.js';
import { initUserSelect } from './userService.js';

document.addEventListener('DOMContentLoaded', async () => {
    createClock();
    updateUI();
    initEventListeners();

    await initUserSelect();
});