import {store} from '../Helpers/Store'
import {ACTIONS} from '../Helpers/Helper'
import {useContext} from 'react'
import dataContext from '../Helpers/Context';

function Footer(props) {
    const data = store.getState();
    const contextData = useContext(dataContext)


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
          <span className="todo-count"><strong>{contextData.activeCount}</strong> item left</span>
          <ul className="filters">
            <li>
              <a className={data.displayType==="All"?"selected":""} href="#/" onClick={handleDisplayType}>All</a>
            </li>
            <li>
              <a className={data.displayType==="Active"?"selected":""} href="#/active" onClick={handleDisplayType}>Active</a>
            </li>
            <li>
              <a className={data.displayType==="Completed"?"selected":""} href="#/completed" onClick={handleDisplayType}>Completed</a>
            </li>
          </ul>
          {contextData.total!==contextData.activeCount?<button className="clear-completed" onClick={handleClearCompleted}>Clear completed</button>:""}
          </footer>
      );
    
  }

  export default Footer;