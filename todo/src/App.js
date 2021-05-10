import './App.css';
import React,{useEffect, useReducer} from 'react'
import Footer from './Components/Footer'
import TodoList from './Components/TodoList'
import InputArea from './Components/InputArea'
import {store} from './Helpers/Store'


function TodoApp() {
    const state = store.getState()
    const total = state.todoListElements.length;
    const activeCount = state.todoListElements.filter((todo) => todo.complete===false).length;
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
      store.subscribe(() => forceUpdate());
    });

    return (
      <section className="todoapp">
        <InputArea 
          activeCount={activeCount}
          total={total}
        />
        {total!==0 &&
          <TodoList
            todoListElements={state.todoListElements}
            displayType={state.displayType}
            activeCount={activeCount}
            total={total}
          />
        }

        {total!==0 &&
          <Footer 
            todoListElements={state.todoListElements}
            displayType={state.displayType}
            activeCount={activeCount}
            total={total}
          />
        }
      </section>
    );
}

export default TodoApp;