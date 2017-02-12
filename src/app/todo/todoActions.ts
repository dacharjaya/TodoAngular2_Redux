export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export class TodoActions {
	
	constructor() {
		// this.nextTodoId = 0;
	}

	addTodo(title){
		return {
			type: ADD_TODO,
			title: title,
			completed: false
		}
	}

	removeTodo(id) {
		return {
			type: REMOVE_TODO,
			id: id
		}
	}

	toggleTodo(id) {
		return {
			type: TOGGLE_TODO,
			id: id
		}
	}

	updateTodo(id, title) {
		return {
			type: UPDATE_TODO,
			id: id,
			title: title
		}
	}
}