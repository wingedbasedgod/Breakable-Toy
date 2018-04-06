import React, { Component } from 'react';
import PatternTile from '../components/PatternTile';
import { Link } from 'react-router';

class PatternsIndexContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      allPatterns: [],
      title: 'Choose Your Rudiment or Warm-up'
    }
  }

  componentDidMount() {
    fetch('/api/v1/patterns.json')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ allPatterns: body.patterns });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let patternsList = this.state.allPatterns;
    let patterns = patternsList.map(pattern => {

      return (
        <PatternTile
          key={pattern.id}
          id={pattern.id}
          name={pattern.name}
        />
      )
    })
    return(
      <div id="patterns_index">
        <h1>{this.state.title}</h1><br />
        <div className="index-container">
          {patterns}
        </div>
      </div>
    )
  }
}
export default PatternsIndexContainer;
