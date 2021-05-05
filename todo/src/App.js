import './App.css';
import React, { Component } from 'react'

class TodoApp extends React.Component {
  render() {
    return (
      <section class="todoapp">
        <InputArea />
        <TodoList />
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
        <input className="new-todo" placeholder="What needs to bo done ? "></input>
      </header>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <section class="main">
        <input id="toggle-all" className="toggle-all" type="checkbox"></input>
        <label for="toggle-all">Mark as Complete!</label>
        <ul className="todo-list">
          <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox" ></input>
              <label>Hello World React!!</label>
              <button className="destroy"></button>
            </div>
            <input className="edit" value="Create a TodoMVC Template"></input>
          </li>
          <Todo />
        </ul>
      </section>
    );
  }
}

class Todo extends React.Component {
  render() {
    return (
      <li className="">
        <div className="view">
          <input className="toggle" type="checkbox" checked></input>
          <label>Simple Hello World!</label>
          <button className="destroy"></button>
        </div>
        <input className="edit" value="Create a TodoMVC Template"></input>
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