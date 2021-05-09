import './App.css';
import React from 'react'
import uuid from 'react-uuid';

class TodoApp extends React.Component {
  constructor() {
    super()
    this.state = {
      displayType: "All", 
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
      ],
    }
    this.handleToggleTodoList = this.handleToggleTodoList.bind(this);
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDisplayType = this.handleDisplayType.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }
  //activeCount = this.state.todoListElements.filter((todo) => todo.complete===true).length;
  handleToggleTodoList(all) {
    console.log(all)
    const   newTodos = this.state.todoListElements.map((todo) => {
          return Object.assign({}, todo, {
            complete: all,
          });
       
      });
   
    this.setState({
      todoListElements: newTodos,
    });
  }
  handleNewTodo(todo) {
    console.log("New Todo added: " + todo);
    this.setState({ todoListElements: [...this.state.todoListElements, {"id": uuid(),"name": todo, "complete": false}]})
  }

  handleDone(id){
    const newTodos = this.state.todoListElements.map((todo) => {
      if (todo.id === id) {
        return Object.assign({}, todo, {
          complete: !todo.complete,
        });
      } else {
        return todo;
      }
    });
    this.setState({
      todoListElements: newTodos,
    });
  }

  handleDelete(id){
    const newTodos = this.state.todoListElements.filter((todo) => todo.id!==id );
    this.setState({
      todoListElements: newTodos,
    });
  }

  handleDisplayType(type){
    this.setState({displayType: type});
  }

  handleClearCompleted(){
    console.log("Clear Completed!!!")
    const newTodos = this.state.todoListElements.filter((todo) => todo.complete===false );
    this.setState({
      todoListElements: newTodos,
    });
  }
  render() {
    const total = this.state.todoListElements.length;
    const activeCount = this.state.todoListElements.filter((todo) => todo.complete===false).length;

    return (
      <section className="todoapp">
        <InputArea 
          newtodo={this.handleNewTodo}
          activeCount={activeCount}
          total={total}
        />
          {total &&
          <TodoList
            todoListElements={this.state.todoListElements}
            handleToggleTodoList={this.handleToggleTodoList}
            displayType={this.state.displayType}
            handleDone={this.handleDone}
            handleDelete={this.handleDelete}
            activeCount={activeCount}
            total={total}
          />}
        {total &&

        <Footer 
          handleDisplayType={this.handleDisplayType}
          handleClearCompleted={this.handleClearCompleted}
          todoListElements={this.state.todoListElements}
          displayType={this.state.displayType}
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
          }

          console.log(todo.id + " "+todo.complete + " "+this.props.displayType)
          
        
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