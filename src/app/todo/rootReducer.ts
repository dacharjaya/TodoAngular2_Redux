import * as TodoActions from './todoActions';

const initialState = {
	todos : [
		{id: 1, title: 'test task', completed: true},
		{id: 2, title: 'test task2', completed: false},
		{id: 3, title: 'test task3', completed: false},
	]
}

export function rootReducer (state = initialState, action) {
	switch (action.type) {
		case TodoActions.ADD_TODO:
			return {
				todos: state.todos.concat({
					id: state.todos[state.todos.length -1].id +1,
					title: action.title,
					completed: false
				})};
		
		case TodoActions.REMOVE_TODO:
			return {
				todos: state.todos.filter( todo => todo.id !== action.id )
			};

		case TodoActions.TOGGLE_TODO:
			return {
				todos: state.todos.map( todo => {
					if(todo.id !== action.id){
						return todo;
					} else{
						todo.completed = !todo.completed
						return todo;
					}
				})
			};

		case TodoActions.UPDATE_TODO:
			return {
				todos: state.todos.filter( todo => {
					if(todo.id === action.id){
						todo.title = action.title;
					}
					return todo;
				})
			};

		default:
			return state;
	}
};

