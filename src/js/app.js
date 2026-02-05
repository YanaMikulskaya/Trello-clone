import { createClock } from "./clock.js";
import { updateUI } from "./updateUI.js";
import { initEventListeners } from "./eventHandlers.js";
import { initUserSelect } from "./userService.js";

// Обработчик события полной загрузки DOM дерева
document.addEventListener("DOMContentLoaded", async () => {
  createClock(); // Инициализация часов
  updateUI(); // Первоначальная отрисовка интерфейса
  initEventListeners(); // Настройка всех обработчиков событий

  await initUserSelect(); // Асинхронная инициализация выбора пользователей
});
