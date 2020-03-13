import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom' 
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';


class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .then(respons => this.setState({ todos: respons.data}))
  };

  toggleComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })});
  };

  deleteTodo = (id) => {
    // ``because you need ID to delete something
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  };

  addTodo= (searchfield) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: searchfield,
      completed: false
    })
      .then(response => {
        response.data.id = uuidv4();
        this.setState({ todos: [...this.state.todos, response.data]});
      });
    //OR when using uuid: 
    // const newTodo = {
    //   id: uuidv4(),
    //   title: searchfield,
    //   completed: false
    // }
    // this.setState({ todos: [...this.state.todos, newTodo]})
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
