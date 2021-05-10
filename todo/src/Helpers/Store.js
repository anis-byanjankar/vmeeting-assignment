import {createStore} from 'redux'
import {getURL,ACTIONS} from './Helper'
import uuid from 'react-uuid';



function reducer(state, action) {
    if (action.type === ACTIONS.ADD) {
      return {
        displayType: state.displayType, 
        todoListElements: [...state.todoListElements,action.message],
      };
    } else if (action.type === ACTIONS.DELETE) {
      const newTodos = state.todoListElements.filter((todo) => todo.id!==action.id );
      return {
        displayType: state.displayType, 
        todoListElements: newTodos,
      };
    }
    else if (action.type === ACTIONS.UPDATE_DT){
      return {
        displayType: action.displayType,
        todoListElements: state.todoListElements,
      };
    }
    else if (action.type === ACTIONS.DONE){
      const newTodos = state.todoListElements.map((todo) => {
        if (todo.id === action.id) {
          return Object.assign({}, todo, {
            complete: !todo.complete,
          });
        } else {
          return todo;
        }
      });
      return {
        displayType: state.displayType,
        todoListElements: newTodos,
      };
    }
    else if(action.type === ACTIONS.ALL_DONE){
      const newTodos = state.todoListElements.map((todo) => {
        return Object.assign({}, todo, {
          complete: action.complete,
        });
       
      });
      return {
        displayType: state.displayType,
        todoListElements: newTodos,
      };
    } 
    else if(action.type === ACTIONS.CLEAR_COMPLETED){
      const newTodos = state.todoListElements.filter((todo) => todo.complete===false );
      return {
        displayType: state.displayType,
        todoListElements: newTodos,
      };
    }else {
      return state;
    }
  }
  
  const initialState = {  
    displayType: getURL(), 
    todoListElements: [
      {
        "id": uuid(), 
        "name": "Learn React",
        "complete": true 
      },
      {
        "id": uuid(), 
        "name": "Learn React2",
        "complete": false 
      },
    ], };
  
  export const store = createStore(reducer,initialState);