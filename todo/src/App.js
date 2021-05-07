import './App.css';
import React, { Component,setState } from 'react'

class TodoApp extends React.Component {
  constructor() {
    super()
    this.state = {
      showTodos: true
    }
    this.handleToggleTodoList = this.handleToggleTodoList.bind(this);
  }
  handleToggleTodoList(e) {
    e.preventDefault();
    this.setState({ showTodos: !this.state.showTodos })
    console.log(e);
  }
  render() {
    this.todoListElement = [
      { "name": "Learn React", "complete": true },
      { "name": "Learn React2", "complete": false },
      { "name": "Learn React3", "complete": true }
    ]

    return (
      <section className="todoapp">
        <InputArea />
      
          <TodoList
            todoListElement={this.todoListElement}
            handleToggleTodoList={this.handleToggleTodoList}
            toggleListState={this.state.showTodos}
          />
        <Footer />
      </section>
    );
  }
}

class InputArea extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to bo done ?"></input>
      </header>
    );
  }
}

class TodoList extends React.Component {
  render() {
    const todos = this.props.todoListElement.map((todo) => (
      <Todo
        key={todo.name}
        name={todo.name}
        complete={todo.complete}
      />
    ));

    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" onClick={this.props.handleToggleTodoList}></input>
        <label htmlFor="toggle-all">Mark as Complete!</label>
        {this.props.toggleListState &&
        <ul className="todo-list">
          {todos}
        </ul>
        }
      </section>
    );
  }
}

class Todo extends React.Component {
  handleDone() {
    console.log("Crossed Out!");
  }
  handleDelete() {
    console.log("Delete Clicked!");
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
  render() {
    return (
      <footer className="footer">
        <span className="todo-count"><strong>0</strong> item left</span>
        <ul className="filters">
          <li>
            <a className="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}

export default TodoApp;