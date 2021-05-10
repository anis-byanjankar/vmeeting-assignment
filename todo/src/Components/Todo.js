import {store} from '../Helpers/Store'
import {ACTIONS} from '../Helpers/Helper'

function Todo(props) {
    function handleDone(){
        console.log(ACTIONS.DONE);
        store.dispatch({
        type: ACTIONS.DONE,
        id: props.id,
        });
    }

    function handleDelete(){
        store.dispatch({
        type: 'DELETE_TODO',
        id: props.id,
        });
    }
  
      return (
        <li className={props.complete ? "completed" : ""}>
          <div className="view">
            <input className="toggle" type="checkbox" onChange={handleDone} checked={(!!props.complete)}></input>
            <label>{props.name}</label>
            <button className="destroy" onClick={handleDelete}></button>
          </div>
        </li>
      );
  }

  export default Todo;