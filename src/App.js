import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom' 
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import { v4 as uuidv4 } from 'uuid'
import './App.css';


class App extends Component {
  state = {
    todos: [
      {
        id: uuidv4(),
        title: 'Take out trash',
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Make dinner',
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Buy food',
        completed: false
      }
    ]
  }

  toggleComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })});
  }

  deleteTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }

  addTodo= (searchfield) => {
    const newTodo = {
      id: uuidv4(),
      title: searchfield,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} deleteTodo={this.deleteTodo} />
              </Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
