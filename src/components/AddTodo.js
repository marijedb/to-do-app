import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
    state = {
        searchfield: ''
    }

    // the event.target.title will make this function reusable for other fields. 
    onChange = (event) => {
        this.setState({ [event.target.title]: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addTodo(this.state.searchfield);
        this.setState({ searchfield: ''})
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <input 
                    type="text" 
                    title="searchfield" 
                    placeholder="Add Todo..." 
                    style={{flex: '10', padding: '5px'}} 
                    value={this.state.searchfield}
                    onChange={this.onChange}
                />
                <input 
                    type="submit" 
                    value="Submit" 
                    className="btn" 
                    style={{flex: '1'}} 
                />
            </form>
        )
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}


export default AddTodo;
