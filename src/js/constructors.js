 export class Todo {
    id = crypto.randomUUID()
    createdAt = new Date().toString()

    constructor({ title, description, user, status = 'todo' }) {
        this.title = title
        this.description = description
        this.status = status
        this.user = user
    }
};