import Todo from './Todo'
import {store} from '../Helpers/Store'
import {ACTIONS} from '../Helpers/Helper'

function TodoList(props){
    const data = store.getState();

    function handleToggleTodoList(){
      console.log("TOggleaa!!!" + props.total +" "+ props.activeCount)
      let completed = null
      if (props.activeCount === 0 && props.total!==0){
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