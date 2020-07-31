import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Welcome(){

    const history = useHistory();

    function start(){
        history.push(`/game`)
    }

    return(
        <div id='WelcomePage'>
            <img src='..\src\LifeAnimation.gif' id='welcome-img' alt='Game of Life pattern'/>
            <h1>Welcome</h1>
            <p id='welcome-text'>
                "This game is a class of discrete model known as a Cellular Automaton, abbreviated CA. It's made up of a grid of cells that follow a simple set of rules from which complex behaviors can emerge.
                <br />
                In the Game of Life, these rules examine each cell of the grid. For each cell, it counts that cell's eight neighbors (up, down, left, right, and diagonals), and then act on that result.
                <br />
                If cell is dead, it remains dead UNLESS it has 3 live neighbors.
                If a cell has fewer than two live neighbors or more than three, it dies.
            </p>
            <Button variant="outlined" className='button' onClick={() => start()}>Play Now</Button>

        </div>
    )
};

export default Welcome;