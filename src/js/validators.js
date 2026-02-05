import { getTodosByStatus } from "./queries.js";

// Проверяет, не превышен ли лимит задач в статусе "inProgress"
export function validateInProgressLimit() {
  const countInProgress = getTodosByStatus("inProgress").length;
  return countInProgress < 6; // Максимум 6 задач
}
