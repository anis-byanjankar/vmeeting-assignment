import {store} from '../Helpers/Store'
import uuid from 'react-uuid';
import {ACTIONS} from '../Helpers/Helper'


function InputArea(props) {
    function handleNewTodo(todo) {//No more props drilling.
        console.log(ACTIONS.ADD);
        store.dispatch({
        type: ACTIONS.ADD,
        message: {
            "id": uuid(),
            "name": todo,
            "complete": false,
        },
        });
    }
    function handleEnter(e) {
      if (e.charCode === 13) {
        handleNewTodo(e.target.value); 
        e.target.value='';
      }
    }
   
   
      return (
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" onKeyPress={handleEnter} placeholder="What needs to bo done ?"></input>
        </header>
      );
    
  }

  export default InputArea;