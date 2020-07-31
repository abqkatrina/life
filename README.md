##### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
---
# Game of Life App
![example-patterns](https://media.giphy.com/media/4VVZTvTqzRR0BUwNIH/giphy.gif)

[from Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)

---

## Planning
---
  ### Objectives
  This is a Lambda School project with the following challenges:
* Student should be able to create a unique, high-quality project that
  can be added to a professional portfolio
* Student should be able to describe the rules of Conway’s “Game of
  Life”
* Student should be able to explain what cellular automata are and
  describe how they are useful in real
  life
* Student should be able to correctly analyze the ‘Turing Completeness’
  of Conway’s “Game of Life”
* Student should be able to implement a visualization of Conway’s “Game
  of Life” using technologies related to their specific
  track
* Student should be able to utilize "double buffering" to implement
  the game
  ---
  ### Design
  In order to satisfy the requirements, I began by listing necessary components and creating a paper   wireframe. I included:
- A grid to display cells
- Cell objects that are clickable to toggle the current status of the cell (alive/dead)
- An array (rows) of arrays(columns) to give each cell a spot in the grid
- Buttons to start and pause animation
  I got in over my head here as I originally tried to create a honeycomb-shaped grid -- my       understanding of sizes and shapes of arrays turned out to be not so great. I also wanted to make the  cells a specific shape with no space between cells, but I ran out of time.
  ---
## Implementation
---
  ### Algorithms
  ---
  It took me a while to sort out the logic needed to create this grid and run the animation according to the rules of life. I spent a lot of time trying to sort out the usage of components when creating a random grid. My code needed to:
  -   Loop through every cell, determining whether they were alreay alive or dead
  -   Calculate the status of 8 neighbor cells and use the results to determine the status the  current cell should be.
  -   Save that data as the next generation in the animation and replace the current generation with that
  - Reat all these steps for each generation (loop)
  I started off wanting to use new frameworks and interfaces -- and I did use material-ui for the first time -- but eventually I went back to basics. The bulk of the project is simple classes and functions layered in a tangle. Ideally, I want to go back and clean up the code. I think it could be DRYer.
---
## Future Improvements
---
I've included some non-functioning elements in the current build, such as allowing the user to click through the generations and establishing random patterns. I intend to deploy the app once I've got most of the bugs out. I'm also going to finish the elements I started but didn't get a chance to finish.
