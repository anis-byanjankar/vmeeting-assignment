import Todo from './Todo'
import {store} from '../Helpers/Store'
import {ACTIONS} from '../Helpers/Helper'
import {useContext} from 'react'
import dataContext from '../Helpers/Context';

function TodoList(props){
    const data = store.getState();
    const contextData = useContext(dataContext)

    function handleToggleTodoList(){
      console.log("TOggleaa!!!" + contextData.total +" "+ contextData.activeCount)
      let completed = null
      if (contextData.activeCount === 0 && contextData.total!==0){
        completed = false;
      }
      else{
        completed = true;  
      }
      console.log(ACTIONS.ALL_DONE);
      store.dispatch({
        type: ACTIONS.ALL_DONE,
        complete: completed,
      });
    }
        const todos = data.todoListElements.map((todo) => {
            let flag = true;
  
            if (data.displayType!=="All"){
                if (data.displayType==="Completed"){
                  flag = todo.complete? true: false
                }
                else{
                  flag = !todo.complete? true: false
                }
            }
  
            if (flag){
              return (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  name={todo.name}
                  complete={todo.complete}
                />
              );
            }else{
              return null
            }
          
        });
  
      return (
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" onClick={handleToggleTodoList}></input>
          <label htmlFor="toggle-all">Mark as Complete!</label>
          <ul className="todo-list">
            {todos}
          </ul>
          
        </section>
      );
    
  }

  export default TodoList;