import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "https://swapi.co/api/";
const PEOPLE_URL = `${BASE_URL}people/`;
const PLANET_URL = `${BASE_URL}planets/`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
      planets: [],
      loading: true
    };
    this.fetchPlanets = this.fetchPlanets.bind(this);
    this.fetchPeople = this.fetchPeople.bind(this);
  }
  componentDidMount() {
    console.log("component did mount");
    axios
      .get(PEOPLE_URL)
      .then(response =>
        this.setState({ loading: false, people: response.data.results })
      )
      .catch(err => console.log(err));
  }
  fetchPeople(){
    this.setState({loading: true});
    axios
    .get(PEOPLE_URL)
    .then(response => this.setState({ loading: false, people: response.data.results, planets: [] })
    .catch(err => console.log(err)));
  }
  fetchPlanets() {
    this.setState({ loading: true });
    axios
      .get(PLANET_URL)
      .then(response => this.setState({ loading: false, planets: response.data.results }))
      .catch(err => console.log(err));
  }
  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    const planets = this.state.planets.map((planet, index) =>(
      <li key={index}>{planet.name}</li>
    ));
    const people = this.state.people.map((person, index) => (
      <li key={index}>{person.name}</li>
    ));
    return (
      <div>
        <ul>{planets.length === 0? people: planets}</ul>
        {planets.length === 0 ? 
        <button onClick={this.fetchPlanets}>What are the planets?</button> : 
        <button onCLick={this.fetchPeople}>who are the people?</button>}
      </div>
    );
  }
}

export default App;
