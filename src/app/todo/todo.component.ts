import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from './todo.service';

//redux
import { createStore } from 'redux';
import { rootReducer } from './rootReducer';
import { TodoActions } from './todoActions';


const appStore = createStore(rootReducer);

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [
    { provide: 'AppStore', useValue: appStore },
    TodoActions 
  ]
})
export class TodoComponent {
    private todos;
    private activeTasks;
    private newTodo;
    private path;

    constructor(private route: ActivatedRoute, private todoAction: TodoActions) {
        // this.todos = appStore.getState().todos;
        // appStore.subscribe(() => {
        //     this.todos = appStore.getState().todos;
        // });
    }

    getTodos(query = '') {
        let data = appStore.getState().todos;
        if(query === 'completed' || query === 'active'){
            var isCompleted = query === 'completed';
            data = data.filter(todo => todo.completed === isCompleted);
        } 
        this.todos = data;
        this.activeTasks = data.filter(todo => todo.completed === false).length;
    }

    addTodo() {
        appStore.dispatch(this.todoAction.addTodo(this.newTodo));
        this.newTodo = '';
    }

    deleteTodo(todo) {
        appStore.dispatch(this.todoAction.removeTodo(todo.id));
    }

    toggleTodo(id) {
        appStore.dispatch(this.todoAction.toggleTodo(id));
    }

    updateTodo(id, newTitle) {
        appStore.dispatch(this.todoAction.updateTodo(id, newTitle));
        // todo.editing = false;
    }

    ngOnInit() {
        
        appStore.subscribe(() => {
            this.todos = appStore.getState().todos;
        });
        this.route.params.subscribe(params => {
            this.path = params['status'];
            this.getTodos(this.path);
        });
    }

}
