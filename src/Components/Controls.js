import React, { Component, useState } from 'react';
import { IconButton, Grid } from '@material-ui/core';
import CustomSlider from './Slider';
// import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import FastForwardIcon from '@material-ui/icons/FastForward';
// import GrainIcon from '@material-ui/icons/Grain';
 

export default class Controls extends Component {

    constructor(props){
        super(props);
        this.state = {
        isPlaying: false,
        timer: 1000,
        grid: new Grid()
        }
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.playGame =this.playGame.bind(this)
    }

    

//**********BUTTON FUNCTIONS */
    start() {
        if (!this.state.isPlaying) {
            this.setState({
                isPlaying: true,
            }, () => {
                this.intervalRef = setInterval(() => this.playGame(), this.state.timer);
            })
        }
    }

    playGame() {
        this.setState({
            game: this.state.game.addGeneration()
        })
    }

    stop() {
        this.setState({
            gameRunning: false
        }, () => {
            if (this.intervalRef) {
                clearInterval(this.intervalRef);
            }
        })
    }
    // this.state.isPlaying = true ? 
    render() {
    return(
        <div id='controls'>
            <label htmlFor='pause'>Pause</label>
                <IconButton aria-label='pause' id='pause' onClick={this.stop}>
                   <PauseCircleOutlineIcon />
                </IconButton>
            <CustomSlider />
        </div>
        // :
        // <div>
        //     <label htmlFor='start'>Start</label>
        //         <IconButton aria-label='start' id='start' onClick={this.start}>
        //             <PlayCircleOutlineIcon />
        //         </IconButton>  
        //     <label htmlFor='random'>Random</label>
        //         <IconButton aria-label='start randomly' id='random' onClick={() =>randomButtonHandler()}>
        //             <GrainIcon />
        //         </IconButton>
        //     <label htmlFor='clear'>Clear</label>
        //         <IconButton aria-label='clear grid' id='clear' onClick={() => clearButtonHandler()}>
        //             <HighlightOffIcon />
        //         </IconButton> */}
        // </div>
    )}
}
