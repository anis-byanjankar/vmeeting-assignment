import './App.css';
import React from 'react'
import uuid from 'react-uuid';
import {createStore} from 'redux'

function getURL(){
  // Pull the url path and location.
  const location = window.location.href;
  var urlDisplayType = location.substring(location.indexOf("#")+2);
  switch (urlDisplayType){
    case "active":
      urlDisplayType = "Active"
      break;
    case "completed":
      urlDisplayType = "Completed"
      break;
    default:
      urlDisplayType = "All"
  }
  return urlDisplayType

}

function reducer(state, action) {
  if (action.type === 'NEW_TODO') {
    return {
      displayType: state.displayType, 
      todoListElements: [...state.todoListElements,action.message],
    };
  } else if (action.type === 'DELETE_TODO') {
    const newTodos = state.todoListElements.filter((todo) => todo.id!==action.id );
    return {
      displayType: state.displayType, 
      todoListElements: newTodos,
    };
  }
  else if (action.type === 'UPDATE_DISPLAYTYPE'){
    return {
      displayType: action.displayType,
      todoListElements: state.todoListElements,
    };
  }
  else if (action.type === 'COMPLETE_TODO'){
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
  else if(action.type === 'ALL_COMPLETE'){
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
  else if(action.type === 'CLEAR_COMPLETED'){
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

const store = createStore(reducer,initialState);

class TodoApp extends React.Component {
  componentDidMount(){
    store.subscribe(() => this.forceUpdate()); 
  }

  handleToggleTodoList(all) {
    console.log("ALL_COMPLETE");
    store.dispatch({
      type: 'ALL_COMPLETE',
      complete: all,
    });
    console.log(all);
  }
  handleNewTodo(todo) {
    // console.log("NEW_TODO" + todo);
    store.dispatch({
      type: 'NEW_TODO',
      message: {
        "id": uuid(),
        "name": todo,
        "complete": false,
      },
    });
  }

  handleDone(id){
    // console.log("COMPLETE_TODO");
    store.dispatch({
      type: 'COMPLETE_TODO',
      id: id,
    });
  }

  handleDelete(id){
    store.dispatch({
      type: 'DELETE_TODO',
      id: id,
    });
  }

  handleDisplayType(display){
    console.log("UPDATE DT "+ display)
    store.dispatch({
      type: 'UPDATE_DISPLAYTYPE',
      displayType: display
    });
  }

  handleClearCompleted(){
    console.log("CLEAR_COMPLETED")
    store.dispatch({
      type: 'CLEAR_COMPLETED',
    });
  }

  render() {
    const state = store.getState()
    const total = state.todoListElements.length;
    const activeCount = state.todoListElements.filter((todo) => todo.complete===false).length;

    return (
      <section className="todoapp">
        <InputArea 
          newtodo={this.handleNewTodo}
          activeCount={activeCount}
          total={total}
        />
        {total!==0 &&
          <TodoList
            todoListElements={state.todoListElements}
            handleToggleTodoList={this.handleToggleTodoList}
            displayType={state.displayType}
            handleDone={this.handleDone}
            handleDelete={this.handleDelete}
            activeCount={activeCount}
            total={total}
          />
        }

        {total!==0 &&
          <Footer 
            handleDisplayType={this.handleDisplayType}
            handleClearCompleted={this.handleClearCompleted}
            todoListElements={state.todoListElements}
            displayType={state.displayType}
            activeCount={activeCount}
            total={total}
          />
        }
      </section>
    );
  }
}

class InputArea extends React.Component {

  constructor() {
    super();
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter(e) {
    if (e.charCode === 13) {
      this.props.newtodo(e.target.value); //Prop drilling
      e.target.value='';
    }
  }
 
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" onKeyPress={this.handleEnter} placeholder="What needs to bo done ?"></input>
      </header>
    );
  }
}

class TodoList extends React.Component {
  constructor(){
    super();
    this.handleDone = this.handleDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggleTodoList = this.handleToggleTodoList.bind(this);

  }

  handleDone(id) {
    console.log("TODO List -- >")
    this.props.handleDone(id);
  }
  handleDelete(id) {
    this.props.handleDelete(id);
  }
  handleToggleTodoList(){
    console.log("TOggleaa!!!" + this.props.total +" "+ this.props.activeCount)
    if (this.props.activeCount === 0 && this.props.total!==0){
      this.props.handleToggleTodoList(false);
    }
    else{
      this.props.handleToggleTodoList(true);

    }

  }

  render() {
        const todos = this.props.todoListElements.map((todo) => {
          let flag = true;

          if (this.props.displayType!=="All"){
              if (this.props.displayType==="Completed"){
                flag = todo.complete? true: false
              }
              else{
                flag = !todo.complete? true: false
              }
          }
          console.log(todo.id + " "+todo.complete + " "+this.props.displayType)

          if (flag){
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                name={todo.name}
                complete={todo.complete}
                handleDone={this.handleDone}
                handleDelete={this.handleDelete}
              />
            );
          }else{
            return null
          }
        
      });

    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" onClick={this.handleToggleTodoList}></input>
        <label htmlFor="toggle-all">Mark as Complete!</label>
        <ul className="todo-list">
          {todos}
        </ul>
        
      </section>
    );
  }
}

class Todo extends React.Component {
  constructor(){
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  handleDone(e) {
    this.props.handleDone(this.props.id);
  }
  
  handleDelete(e) {
    e.preventDefault();
    this.props.handleDelete(this.props.id)
  }

  render() {
    return (
      <li className={this.props.complete ? "completed" : ""}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={this.handleDone} checked={(!!this.props.complete)}></input>
          <label>{this.props.name}</label>
          <button className="destroy" onClick={this.handleDelete}></button>
        </div>
      </li>
    );
  }
}

class Footer extends React.Component {
  constructor(){
    super();
    this.handleDisplayType = this.handleDisplayType.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  handleDisplayType(e){
    // console.log(e.target.outerText)
    this.props.handleDisplayType(e.target.outerText);
  }

  handleClearCompleted(){
    console.log("Clear Completed!!");
    this.props.handleClearCompleted()
  }

  render() {
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{this.props.activeCount}</strong> item left</span>
        <ul className="filters">
          <li>
            <a className={this.props.displayType==="All"?"selected":""} href="#/" onClick={this.handleDisplayType}>All</a>
          </li>
          <li>
            <a className={this.props.displayType==="Active"?"selected":""} href="#/active" onClick={this.handleDisplayType}>Active</a>
          </li>
          <li>
            <a className={this.props.displayType==="Completed"?"selected":""} href="#/completed" onClick={this.handleDisplayType}>Completed</a>
          </li>
        </ul>
        {this.props.total!==this.props.activeCount?<button className="clear-completed" onClick={this.handleClearCompleted}>Clear completed</button>:""}
        </footer>
    );
  }
}

export default TodoApp;