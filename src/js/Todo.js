//Модель задачи Todo
export class Todo {
  constructor({ title, description, user, status = "todo", id, createdAt }) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.user = user;
    this.id = id || crypto.randomUUID();
    this.createdAt = createdAt || new Date().toLocaleString("ru-RU");
  }
}
