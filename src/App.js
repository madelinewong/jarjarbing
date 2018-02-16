import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "https://swapi.co/api/";
const PEOPLE_URL = `${BASE_URL}people/`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
      loading: true
    };
  }
  componentDidMount() {
    console.log("component did mount");
    axios
      .get(PEOPLE_URL)
      .then(response => this.setState({ loading: false, people: response.data.results }))
      .catch(err => console.log(err));
  }
  render() {
    if(this.state.loading){
      return <h1>Loading...</h1>
    }
    const people = this.state.people.map(person => <li>{person.name}</li>);
    return (
     <ul>
       {people}
    </ul>);
  }
}

export default App;
