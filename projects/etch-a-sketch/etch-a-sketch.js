const container = document.getElementById("container");

/**
* the clearButton() function will "clear the grid" making the background color
* of every item in the grid white.  It will also prompt the user to enter their own
* custom size for the grid.  If no input is given the grid will default to size 16.
*/
function clearButton()
{
    var userPrompt = "How many squares per side would you like to see in the grid?"; // user prompt

    var validInput = false; // flag for correct user input

    while (!validInput)
    {
        var newGridSizeInput = prompt(userPrompt, 16);

        if (newGridSizeInput == null)
        {
            // if user hit cancel
            validInput = true; // remove flag
            resetGrid(); // delete current grid
            createGrid(); // create default grid
        }
        else if (newGridSizeInput <= 0)
        {   
            // if user entered a number less than 0
            alert("Error: Please enter a number greater than 0"); // error message
        }
        else if (newGridSizeInput % 1 !== 0)
        {
            alert("Error: Please enter a whole number");
        }
        else if (newGridSizeInput.length <= 0 || isNaN(newGridSizeInput) )
        {
            // user pressed OK, but input invalid or does not input anything
            alert("Error: Invalid Input\nPlease Try Again"); // error message
        }
        else
        {
            // correct Input
            validInput = true;
            resetGrid(); // delete current grid
            createGrid(newGridSizeInput, newGridSizeInput); // create new grid with user input
        }
    } 
}

/**
* the resetGrid() function deletes the currently drawn grid
*/
function resetGrid ()
{
    while (container.hasChildNodes())
    {
        // while container has children
        container.removeChild(container.firstChild); // remove current child
    }
}

/**
* the createGrid() function creates a grid with the amount of rows and columns
* based of the parameters rows and cols.  If no parameters are entered the
* program will default each row and column size to 16.
*/
function createGrid(rows = 16, cols = 16) 
{
    var containerSize = 960; //width and height of etch-a-sketch container
    var cellSizeNum = containerSize / rows; //creates size of cell
    var cellSizeStr = cellSizeNum + "px"; // cell size in string-pixel form

    container.style.setProperty('--cell-size', cellSizeStr); 
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (i = 0; i < (rows * cols); i++) 
    {
        let newCell = document.createElement("div");
        newCell.addEventListener("mouseover", function() { 
            newCell.className = "default-color-grid-item";  // on hover change background color to black
        });
        container.appendChild(newCell).className = "grid-item";
        
    }
}

/**
* the defaultColorBtn() function changes the current square  
* background color on hover to black
*/
function defaultColorBtn ()
{
    if (container.hasChildNodes())
    {
        let currentCells = container.childNodes;
                
        for (i = 0; i < currentCells.length; i++)
        {   
            currentCells[i].addEventListener("mouseover", (e) => {
                e.target.className = "default-color-grid-item"; 
                e.target.style.backgroundColor = "black"; // on hover change background color to black
            });
        }
    }
}

/**
* the rainbowBtn() function generates a random color code and
* changes the current square background color on hover to random color
*/
function rainbowBtn ()
{
    if (container.hasChildNodes())
    {
        let currentCells = container.childNodes; 
                
        for (i = 0; i < currentCells.length; i++)
        {   
            currentCells[i].addEventListener("mouseover", (e) => {
                var letters = '0123456789ABCDEF';
                var newColor = '#';
                
                for (var i = 0; i < 6; i++) 
                {
                    newColor += letters[Math.floor(Math.random() * 16)];
                }
                
                e.target.className = "random-color";
                e.target.style.backgroundColor = newColor; // on hover change to background color to random color
            });
        }
    }
}

function main ()
{
    createGrid(); // create default 16x16 grid on load 
}

main(); 