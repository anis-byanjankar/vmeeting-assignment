import './App.css';

function App() {
  return (
    <div className="App">
      <section class="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to bo done ? "></input>
        </header>
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

            <li className="">
              <div className="view">
                <input className="toggle" type="checkbox" checked></input>
                <label>Simple Hello World!</label>
                <button className="destroy"></button>
              </div>
              <input className="edit" value="Create a TodoMVC Template"></input>
            </li>
          </ul>
        </section>
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
      </section>
    </div>
  );
}

export default App;
