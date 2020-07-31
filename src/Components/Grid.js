import React, { Component } from 'react';
import '../css/App.css';
import Game from './Game';

import CustomSlider from './Slider';
import {Box, Button, withStyles, makeStyles} from "@material-ui/core"
// import Icon from '@material-ui/core/Icon';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
// import StopIcon from '@material-ui/icons/Stop';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

const Button1 = withStyles({
    root: {
        width: 100,
        margin: 10,
        height: 30
    }
})(Button);
  

export default class Grid extends Component {


    constructor(props) {
        super(props);
        this.state = {
            game: new Game(),
            size: [40, 20],
            isPlaying: false,
            // isRandom: false,
            interval: 1000,
        }

        this.colChange = this.colChange.bind(this);
        this.rowChange = this.rowChange.bind(this);
        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);
        // this.clear = this.clear.bind(this);
        // this.startRandom = this.startRandom.bind(this);
        this.createGrid = this.createGrid.bind(this);
        this.saveCell = this.saveCell.bind(this);
        
    }

    rowChange(event) {
        if (!this.state.gameRunning) {
            var actualSize = this.state.size;

            if (event.target.value < 50)
                actualSize[1] = event.target.value;
            else
                actualSize[1] = 20;

            this.setState({
                size: actualSize,
            });

            this.createGrid();
        }
    }

    colChange(event) {
        if (!this.state.gameRunning) {
            var actualSize = this.state.size;
            if (event.target.value < 50)
                actualSize[0] = event.target.value;
            else
                actualSize[0] = 50;

            this.setState({
                size: actualSize,
            });

            this.createGrid();
        }
    }

    changeInterval = (value) => {
        this.setState({
            interval: value
        })
    }

    start = () => {
        console.log('start game')
        if (!this.state.isPlaying) {
            //TODO: if empty grid, run randomly
            this.setState({
                // isRandom: false,
                isPlaying: true,
            }, () => {
                this.intervalRef = setInterval(() => this.play(), this.state.interval);
            })
        }
    }

    // startRandom = () => {
    //     console.log('start random game')
    //     if (!this.state.isPlaying) {
    //         //TODO: if empty grid, run randomly
    //         this.setState({
    //             isRandom: true,
    //             isPlaying: true,
    //         }, () => {
    //             this.intervalRef  = setInterval(() => this.play(), this.state.interval);
    //         })
    //     }
    // }
    

    pause = () => {
        console.log('pause game')
        this.setState({
            isPlaying: false
        }, () => {
            if (this.intervalRef) {
                clearInterval(this.intervalRef);
            }
        })
    }

    // clear = () => {
    //     console.log('clear grid', this.state.interval)
    //     this.setState({
    //         isPlaying: false
    //     }, () => {
    //         if (this.intervalRef) {
    //             clearInterval(this.intervalRef);
    //         }
    //     })
    // }
    
    play = () => {
        console.log('play')
        this.setState({
            game: this.state.game.addGeneration()
        })
    }

    plusOne =() => {
        console.log('play')
        this.setState({
            game: this.state.game.getGeneration()+1
        })
    }

    saveCell(locus) {
        if (!this.state.isPlaying) {
            this.setState({
                game: this.state.game.saveCell(locus)
            })
        }
    }

    createGrid = () => {
        var newGame = [];
        var row = [];

        //loop every cell by combination of row and col
        for (var i = 0; i < this.state.size[0]; i++) {
            for (var j = 0; j < this.state.size[1]; j++) {
                //if the status is random
                // if(this.state.game.isRandom){
                //     //define a random binary
                //     var rand = Math.round(Math.random())
                //     //assign status values to 1 and 0
                //     //if rand is 0 save a dead
                //     if(rand === 0){
                //         row.push(
                //             <Cell key={[i, j]} locus={{ x: i, y: j }} live={false} saveCell={this.saveCell.bind(this)} />
                //         );
                //     }
                //         //if rand is 1 save as true
                //     if(rand === 1){
                //         row.push(
                //             <Cell key={[i, j]} locus={{ x: i, y: j }} live={true} saveCell={this.saveCell.bind(this)} />
                //         );
                //     }
                // }

                //if state is not random
                // if(!this.state.game.isRandom){
                    //check if a cell is alive to save as true
                    if (this.state.game.isLiving(i + " , " + j)) {
                        row.push(
                            <Cell key={[i, j]} locus={{ x: i, y: j }} live={true} saveCell={this.saveCell.bind(this)} />
                        );
                    } else {
                        row.push(
                            <Cell key={[i, j]} locus={{ x: i, y: j }} live={false} saveCell={this.saveCell.bind(this)} />
                        );
                    }
                // }
            }
            newGame.push(<div className="row" key={i}>{row}</div>);
            row = [];
            //per loop
        }
        //random or not
        return newGame;
    }

    render() {
        return (
            <div className="game-container">

                <div id='controls' className="control-container">
                    <label htmlFor='rows'> +/- Rows </label>
                        <input type='text'  id='rows' aria-label='add or subtract rows' variant='outlined' className="input" value={this.state.size[1]} onChange={this.rowChange} />
                       
                    <label htmlFor='columns'> +/- Columns </label>
                        <input type="text"  id='cols' aria-label='add or subtract columns' variant='outlined' className="input"value={this.state.size[0]} onChange={this.colChange} />
                    
                    <Button1 startIcon={<PlayCircleFilledIcon />} aria-label='start' id='start' onClick={this.start}>Start</Button1>

                    <Button1 startIcon={<ExposurePlus1Icon />} aria-label='start' id='start' onClick={this.start}>Generation</Button1>
                    
                    
                    <Button startIcon={<ScatterPlotIcon />} aria-label='start randomly' id='random' >Random</Button>

                    <Button1 startIcon={<PauseCircleFilledIcon />} aria-label='pause' id='pause' onClick={this.pause}>Pause</Button1>

                    <CustomSlider value={this.state.interval} />

                    <Button1 startIcon={<ClearIcon />} aria-label='clear grid' id='clear'>Clear</Button1>
                            
                           
                </div>

                <Box id='grid-container' className='grid-container'>
                    {this.createGrid()}
                </Box>

            </div>
        );
    }
}

class Cell extends Component {
    render() {
        return (
            <div onClick={() => this.props.saveCell(this.props.locus)} className={this.props.live ? "live-cell" : "dead-cell"}></div>
        );
    }
}

    
