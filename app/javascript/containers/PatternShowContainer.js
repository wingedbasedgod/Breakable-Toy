import React, { Component } from 'react';
import PatternShow from '../components/PatternShow';
import { Link } from 'react-router';

class PatternShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
       pattern: {},
       tempo: 145,
       playTimes: [],
       hitNumber: 1,
       currentHand: "",
       color: ''
     }
    this.playBeat = this.playBeat.bind(this)
    this.getTimeofHits = this.getTimeofHits.bind(this)
    this.handleClickPlay = this.handleClickPlay.bind(this)
    this.playStuff = this.playStuff.bind(this)
    this.handleTempoChange = this.handleTempoChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleTempoChange(event) {
    event.preventDefault();
    this.setState({ tempo: event.target.value })
  }

  handleSubmit(event) {
    alert('Tempo changed to ' + this.state.tempo)
    event.preventDefault();
  }

  handleClickPlay(event) {
    event.preventDefault();
    let allTimes = []
    allTimes = this.playBeat()
    this.setState({ playTimes: this.playBeat()})
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
      let right = "";
      let left = "";
      let audio1 = new Audio('/audio/gok1.wav');
      let audio2 = new Audio('/audio/gok2.wav');
      let toMilSeconds = time.seconds * 1000;
      let handClass = "";
      let handRight = document.getElementById('right')
      let handLeft = document.getElementById('left')

      handRight.style.color = '#000000'
      handLeft.style.color = '#000000'
      setTimeout(function() {

        if(time.note == "accent") {
          audio2.play();
        } else {
          audio1.play();
        }
        console.log(time.seconds)
        console.log(time.side)
        console.log(time.note)
        if(time.side == "right") {
          // let hand = document.getElementById('right')
          handClass = "right"
          // debugger
          this.setState({ currentHand: handClass })
        } else {
          // let hand = document.getElementById('left')
          handClass = "left"
          this.setState({ currentHand: handClass})
        }

      }.bind(this), (500 + toMilSeconds));

      setTimeout(function() {
        handClass = ""
        this.setState({ currentHand: handClass })
      }.bind(this), (600 + toMilSeconds));

      console.log(this.currentHand)
    })
  }


  render() {
    let showPattern = this.state.pattern
    // debugger
    let playingTimes = this.state.playTimes

    return(
      <div>

        <form onSubmit={this.handleSubmit} >
          <label>
            Tempo:
            <input type="nubmer" value={this.state.tempo} onChange={this.handleTempoChange}/>
          </label>
        </form>
        <PatternShow
          key={this.state.pattern.id}
          id={this.state.pattern.id}
          name={this.state.pattern.name}
          subdivision={this.state.pattern.subdivision}
          onPlayClick={this.handleClickPlay}
          handClass={this.state.currentHand}
          handleTempoChange={this.handleTempoChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default PatternShowContainer;
