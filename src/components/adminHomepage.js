import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/user')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));
    }
}
export default UserList;