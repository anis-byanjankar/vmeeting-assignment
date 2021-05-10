import {store} from '../Helpers/Store'
import {ACTIONS} from '../Helpers/Helper'

function Footer(props) {
    
    function handleClearCompleted(){
        console.log(ACTIONS.CLEAR_COMPLETED)
        store.dispatch({
          type: ACTIONS.CLEAR_COMPLETED,
        });
    }
    
    
    function handleDisplayType(e){
      console.log(ACTIONS.UPDATE_DT)
      store.dispatch({
        type: ACTIONS.UPDATE_DT,
        displayType: e.target.outerText
      });  
    }
  
      return (
        <footer className="footer">
          <span className="todo-count"><strong>{props.activeCount}</strong> item left</span>
          <ul className="filters">
            <li>
              <a className={props.displayType==="All"?"selected":""} href="#/" onClick={handleDisplayType}>All</a>
            </li>
            <li>
              <a className={props.displayType==="Active"?"selected":""} href="#/active" onClick={handleDisplayType}>Active</a>
            </li>
            <li>
              <a className={props.displayType==="Completed"?"selected":""} href="#/completed" onClick={handleDisplayType}>Completed</a>
            </li>
          </ul>
          {props.total!==props.activeCount?<button className="clear-completed" onClick={handleClearCompleted}>Clear completed</button>:""}
          </footer>
      );
    
  }

  export default Footer;