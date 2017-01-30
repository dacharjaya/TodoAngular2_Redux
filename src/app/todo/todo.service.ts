import { Injectable } from '@angular/core';

let todos = [
	{id: 1, title: 'test task', completed: true},
	{id: 2, title: 'test task2', completed: false},
	{id: 3, title: 'test task3', completed: false},
];


@Injectable()
export class TodoService {

  	constructor() { }

	get(query = '') {
		return new Promise(resolve => {
			var data;

			if(query === 'completed' || query === 'active'){
				var isCompleted = query === 'completed';
				data = todos.filter(todo => todo.completed === isCompleted);
			} else {
				data = todos;
			}

			resolve(data)
		});
	}

	add(data) {
		return new Promise(resolve => {
			data.id = todos[todos.length -1].id +1;
			todos.push(data);
			resolve(true);
		});
	}

	delete(id) {
		return new Promise(resolve => {
			let index = todos.findIndex(todo => todo.id === id);
			todos.splice(index,1);
			resolve(true);
		});
	}

	update(data) {
		return new Promise(resolve => {
			let index = todos.findIndex(todo => todo.id === data.id);
			todos[index].title = data.title;
			resolve(true);
		});
	}
}
