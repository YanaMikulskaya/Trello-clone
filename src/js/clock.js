import { clockEl } from "./dom.js";

// Инициализирует часы
export function createClock() {
  // Форматирует и показывает время
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    clockEl.textContent = `${hours}:${minutes}`;
  }
  updateClock(); // Показать сразу
  setInterval(updateClock, 60000); // Обновлять каждую минуту
}
