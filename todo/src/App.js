import './App.css';
import React,{useEffect, useReducer} from 'react'
import Footer from './Components/Footer'
import TodoList from './Components/TodoList'
import InputArea from './Components/InputArea'
import {store} from './Helpers/Store'
import { DataProvider } from './Helpers/Context'


function TodoApp() {
    const state = store.getState()
    const total = state.todoListElements.length;
    const activeCount = state.todoListElements.filter((todo) => todo.complete===false).length;
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
      store.subscribe(() => forceUpdate());
    });

    const data = {
      "total": total,
      "activeCount": activeCount
    }
    
    return (
      <section className="todoapp">
      <DataProvider value={data}>
        <InputArea 
        />
        {total!==0 &&
          <TodoList
          />
        }

        {total!==0 &&
          <Footer 
          />
        }
        </DataProvider>
      </section>
    );
}

export default TodoApp;