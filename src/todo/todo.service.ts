import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.Dto';

@Injectable()
export class TodoService {
  todos: Todo[] = [];
  getTodos(): Todo[] {
    return this.todos;
  }
  addTodo(newTodo: AddTodoDto): Todo {
    const { name, description } = newTodo;
    let id;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }
    const todo = {
      id,
      name,
      description,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }
  getTodoById(id: number): Todo {
    const todo = this.todos.find((actualTodo: Todo) => actualTodo.id === +id);
    if (todo) return todo;
    throw new NotFoundException(`le todo d'id ${id} n'existe pas `);
  }
  deleteTodo(id: number) {
    //chercher l'objet via son  id dans le tableau des todos
    const index = this.todos.findIndex((todo: Todo) => todo.id === +id);

    //utiliser la méthode splice pour supprimer le todo s'il existe
    if (index >= 0) {
      this.todos.splice(index, 1);
      //sinon je vais declancher une erreur
    } else throw new NotFoundException(`le todo d'id ${id} n'existe pas`);

    return {
      message: `Le todo d'id ${id} a été supprimer avec succces`,
      count: 1,
    };
  }
  updateTodo(id: number, newtodo: Partial<Todo>) {
    const todo = this.getTodoById(id);
    todo.description = newtodo.description
      ? newtodo.description
      : todo.description;
    todo.name = newtodo.name ? newtodo.name : todo.name;
    return todo;
  }
}
