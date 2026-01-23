import { clockEl } from './dom.js';

export function createClock() {
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        clockEl.textContent = `${hours}:${minutes}`;
    }
    updateClock()
    setInterval(updateClock, 60000);
}

