import React, { Component } from 'react';
import '../css/App.css';
import Controls from './Controls';
import Game from './Game';



class Cell extends Component {
    render() {
        return (
            <div onClick={() => this.props.saveCell(this.props.position)} className={this.props.live ? "cellAlive" : "cellDead"}></div>
        );
    }
}

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: new Game(),
            size: [10, 10],
            isPlaying: false,
            timer: 100,
        }

        this.colChange = this.colChange.bind(this);
        this.rowChange = this.rowChange.bind(this);
        this.createGrid = this.createGrid.bind(this);
        this.saveCell = this.saveCell.bind(this);
    }

    rowChange(e) {
        if (!this.state.gameRunning) {
            var actualSize = this.state.size;

            if (e.target.value < 20)
                actualSize[1] = e.target.value;
            else
                actualSize[1] = 20;

            this.setState({
                size: actualSize,
            });

            this.createGrid();
        }
    }

    colChange(e) {
        if (!this.state.isPlaying) {
            var actualSize = this.state.size;
            if (e.target.value < 50)
                actualSize[0] = e.target.value;
            else
                actualSize[0] = 50;

            this.setState({
                size: actualSize,
            });

            this.createGrid();
        }
    }

    changeInterval = (e) => {
        if (!this.state.isPlaying) {
            this.setState({
                timer: e.target.value
            })
        }
    }


    saveCell(position) {
        if (!this.state.isPlaying) {
            this.setState({
                game: this.state.game.saveCell(position)
            })
        }
    }

    createGrid() {
        var nextGen = [];
        var cellRow = [];

        for (var i = 0; i < this.state.size[0]; i++) {
            for (var j = 0; j < this.state.size[1]; j++) {
                if (this.state.game.isCellAlive(i + " , " + j)) {
                    cellRow.push(
                        <Cell key={[i, j]} position={{ x: i, y: j }} live={true} saveCell={this.saveCell.bind(this)} />
                    );
                } else {
                    cellRow.push(
                        <Cell key={[i, j]} position={{ x: i, y: j }} live={false} saveCell={this.saveCell.bind(this)} />
                    );
                }
            }
            nextGen.push(<div className="row" key={i}>{cellRow}</div>);
            cellRow = [];
        }

        return nextGen;
    }





    render() {
        return (
            <div className="game-container">

                <Grid render={grid => (<Controls />)}/>

                <div className="'grid'">
                    {this.createGrid()}
                </div>

            </div>
        );
    }
}


