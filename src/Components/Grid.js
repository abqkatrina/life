import React, { Component } from 'react';
import '../css/App.css';
import World from './Game';
import CustomSlider from './Slider';
import {Box, IconButton} from "@material-ui/core"
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import ClearIcon from '@material-ui/icons/Clear';




export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            world: new World(),
            size: [40, 20],
            isPlaying: false,
            isRandom: false,
            timer: 300,
        }

        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);
        this.startRandom = this.startRandom.bind(this);
        this.createGrid = this.createGrid.bind(this);
        this.saveCell = this.saveCell.bind(this);
        
    }

    changeInterval = (event) => {
        if (!this.state.isPlaying) {
            this.setState({
                timer: event.target.value
            })
        }
    }

    start = () => {
        console.log('start game')
        if (!this.state.isPlaying) {
            //if empty grid, run randomly
            this.setState({
                isRandom: false,
                isPlaying: true,
            }, () => {
                this.intervalRef = setInterval(() => this.play(), this.state.timer);
            })
        }
    }

    startRandom = () => {
        console.log('start random game')
        if (!this.state.isPlaying) {
            //if empty grid, run randomly
            this.setState({
                isRandom: true,
                isPlaying: true,
            }, () => {
                this.intervalRef = setInterval(() => this.play(), this.state.timer);
            })
        }
    }
    

    pause = () => {
        console.log('stop game')
        this.setState({
            isPlaying: false
        }, () => {
            if (this.intervalRef) {
                clearInterval(this.intervalRef);
            }
        })
    }


    play = () => {
        console.log('play')
        this.setState({
            world: this.state.world.addGeneration()
        })
    }

    saveCell(position) {
        if (!this.state.isPlaying) {
            this.setState({
                world: this.state.world.saveCell(position)
            })
        }
    }

    createGrid = () => {
        var newWorld = [];
        var cellRow = [];
        
        for (var i = 0; i < this.state.size[0]; i++) {
            for (var j = 0; j < this.state.size[1]; j++) {
                if(!this.state.isRandom){
                    if (this.state.world.isLiving(i + " , " + j)) {
                        cellRow.push(
                           <Cell key={[i, j]} position={{ x: i, y: j }} live={true} saveCell={this.saveCell.bind(this)} />
                        );
                    } else {
                        cellRow.push(
                           <Cell key={[i, j]} position={{ x: i, y: j }} live={false} saveCell={this.saveCell.bind(this)} />
                        );
                    }
                } else {
                    let rand = Math.floor(Math.random()*2) 
                    if(rand === 0){
                        cellRow.push(
                        <Cell key={[i, j]} position={{ x: i, y: j }} live={true} saveCell={this.saveCell.bind(this)} />
                        );
                    } else {
                        cellRow.push(
                            <Cell key={[i, j]} position={{ x: i, y: j }} live={false} saveCell={this.saveCell.bind(this)} />
                         );
                    }
                }
            newWorld.push(<div className="row" key={i}>{cellRow}</div>);
            cellRow = [];
        }

        return newWorld;}
    }

    render() {
        return (
            <div className="world-container">

                <div id='controls' className="control-container">

                    <label htmlFor='start'>Start</label>
                        <IconButton aria-label='start' id='start' onClick={this.start}>
                            <PlayCircleFilledIcon />
                        </IconButton>  


                    <label htmlFor='random'>Random</label>
                        <IconButton aria-label='start randomly' id='random' onClick={this.startRandom}>
                            <ScatterPlotIcon />
                        </IconButton>

                    <label htmlFor='pause'>Pause</label>
                        <IconButton aria-label='pause' id='pause' onClick={this.pause}>
                        <StopIcon />
                        </IconButton>

                    <CustomSlider />

                    <label htmlFor='clear'>Clear</label>
                            <IconButton aria-label='clear grid' id='clear'>
                                <ClearIcon />
                            </IconButton>
                </div>

                <Box id='grid-container' className='grid-container'>
                    {this.createGrid}
                </Box>

            </div>
        );
    }
}

class Cell extends Component {
    render() {
        return (
            <div onClick={() => this.props.saveCell(this.props.position)} className={this.props.live ? "live-cell" : "dead-cell"}></div>
        );
    }
}

    
