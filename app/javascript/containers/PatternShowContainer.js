import React, { Component } from 'react';
import PatternShow from '../components/PatternShow';
import { Link } from 'react-router';

class PatternShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
       pattern: {},
       tempo: 120,
       playTimes: [],
       hitNumber: 1,
       currentHand: []
     }
    this.playBeat = this.playBeat.bind(this)
    this.getTimeofHits = this.getTimeofHits.bind(this)
    this.handleClickPlay = this.handleClickPlay.bind(this)
  }

  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/patterns/${id}.json`, {
      credentials: 'same-origin'
    })
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
      this.setState({ pattern: body.pattern });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleClickPlay(event) {
    event.preventDefault();
    let allTimes = []
    allTimes = this.playBeat()
    this.setState({ playTimes: allTimes})
    console.log(this.state.playTime)
    console.log(allTimes)
    this.playStuff(allTimes)
  }
  getTimeofHits(hitNumber, hands, side) {
    let playAtTime = [];
    let handLength = hands.length
    hands.map((hand, i) => {
      let timing = 0.0;
      let note_type="";
      let playAt = 0;
      let noteDivision = this.state.pattern.subdivision
      let quarterNoteTime = 60.0 / this.state.tempo

      if (hand == 1) {
        note_type = "normal";
        timing = i * noteDivision
        playAt = (timing * quarterNoteTime) + (hitNumber * ((handLength * noteDivision) * quarterNoteTime))
      } else if (hand == 3) {
        note_type= "accent"
        timing = i * noteDivision
        playAt = (timing * quarterNoteTime) + (hitNumber * ((handLength * noteDivision) * quarterNoteTime))
      } else if (hand == 4) {
        note_type=  "diddle"
        timing = i * noteDivision
        playAt = (timing * quarterNoteTime) + (hitNumber * ((handLength * noteDivision) * quarterNoteTime))
        playAtTime.push({
          seconds: playAt,
          side: side,
          note: note_type
        })
        timing = timing + (noteDivision * .5)
        playAt = (timing * quarterNoteTime) + (hitNumber * ((handLength * noteDivision) * quarterNoteTime))
      }

      if (hand != 0){
        playAtTime.push({
          seconds: playAt,
          side: side,
          note: note_type
        })
      }

      i++
    })
    return(playAtTime)
  }

  playBeat() {
    let pattern = this.state.pattern
    let handRight = pattern.right_hand
    let handLeft = pattern.left_hand
    let times = []
    let time = {}


    for (let k = 0; k <= pattern.time_repeated; k = k + 2) {
      for (let l = 0; l < handRight.length; l++) {
        let hits = l + k
        time = this.getTimeofHits(hits, handRight[l], "right")

        times = times.concat(time)

        time = this.getTimeofHits(hits, handLeft[l], "left")

        times = times.concat(time)

        times.concat(time)
      }
    }
    return(times)
  }

  playStuff(times) {
    times.map(time => {
      let audio1 = new Audio('/audio/gok1.wav');
      let toMilSeconds = time.seconds * 1000;
      setTimeout(function() {
        audio1.play();

        console.log(time.seconds)
        console.log(time.side)
        console.log(time.note)

      }, (500 + toMilSeconds));
    })
  }


  render() {
    let showPattern = this.state.pattern

    return(
      <div>
        <PatternShow
          key={this.state.pattern.id}
          id={this.state.pattern.id}
          name={this.state.pattern.name}
          subdivision={this.state.pattern.subdivision}
          onPlayClick={this.handleClickPlay}
        />
      </div>
    )
  }
}

export default PatternShowContainer;
