import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from './todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
    private todos;
    private activeTasks;
    private newTodo;
    private path;

    constructor(private todoService: TodoService, private route: ActivatedRoute) { }

    getTodos(query = '') {
        this.todoService.get(query).then(todos => {
            this.todos = todos;
            this.activeTasks = this.todos.filter(todo => todo.completed === false).length;
        });
    }

    addTodo() {
        this.todoService.add({title: this.newTodo, completd: false}).then(() => {
            this.newTodo = '';
            return this.getTodos();
        });
    }

    deleteTodo(todo) {
        this.todoService.delete(todo.id).then(() => {
            return this.getTodos();
        });
    }

    updateTodo(todo, newTitle) {
        if(newTitle){
            todo.title = newTitle;
        }else{
            todo.completed = !todo.completed;
        }
        
        this.todoService.update(todo).then(() => {
            todo.editing = false;
            return this.getTodos(this.path);
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.path = params['status'];
            this.getTodos(this.path);
        });
    }

}
