
//_____________________________________________FUNCTIONS__________________________________________________________________________
function shuffleChildren(parent)
{
    let children = parent.children          //Children becomes the infant of parent paramater given above
    let i = children.length, k, temp        //Variables i, k and temp are declared. i takes the value of the number of objects of children in all board const
    while(--i > 0)                          // Each time all the code in scope is executed, retire 1 to i, code in scope is executed until i reaches 0
    {
        k = Math.floor(Math.random() * (i+1))   // store in k the greatest int less than or equal to a random number between 0 and 1 times i+1
        temp = children[k]                      // temp gives k postition in board
        children[k] = children[i]               //k position in array board is replaced by i position in the same array board
        parent.appendChild(temp)                // Node temp is added to board 
    }    
}
function showReaction(type, clickedBox)             //Here were create a function with two parameters of any type that will replace our basic alerts
{                                                   //When the game is NOT a success call a limited function of 800 milisecs
    clickedBox.classList.add(type)                  
    if (type !== "success")
    {
        setTimeout(function()
        {
            clickedBox.classList.remove(type)       //It will remove the box error and the box notice divs
        }, 800)
    }
}
function removeAllChildNodes(parent)  //It will remove all children of a parent given node
{             
    while (parent.firstChild) 
    {
        parent.removeChild(parent.firstChild);
    }
}
function hourglass()
{

    let minuts = parseInt(time / 60, 10)
    let seconds = parseInt(time % 60, 10)
  
    minuts = minuts < 10 ? "0" + minuts : minuts
    seconds = seconds < 10 ? "0" + seconds : seconds
  
    timer.innerText = minuts + ":" + seconds
    time = time <= 0 ? 0 : time - 1
    return time
}
function setEasyMode()
{
    mode = easy
    modifierScore = 1
    console.log("20")
    return modifierScore
}
function setIntermediateMode()
{
    mode = intermediate
    modifierScore = 25 //The higher the difficulty the highter score you get
    console.log("240")
    return modifierScore
}
function setHardMode()
{
    mode = hard
    modifierScore = 100 //The higher the difficulty the highter score you get
    console.log("520")
    return modifierScore
}
function setHighScore()
{
    if (highScore == "off")                             //We can toggle high score mode once before refreshing the page 
    { 
        hourglassID = setInterval(hourglass,1000)
        const boxes = document.querySelectorAll("#board")
        removeAllChildNodes(board)                          //Remove all children of board : those are the inital boxes
        console.log(boxes)
        highScore = "on"
        aNumber = 10  
        displayBoard()        
        shuffleChildren(board)                 
        timerDiv.innerHTML = hourglassID                                        //Each second function hourglass is called
        document.querySelector("#timer").appendChild(timerDiv)                  //Makes the timer appear
        easyButton.removeEventListener("click",setEasyMode)                     //For fairness high scores are separated by categories
        intermediateButton.removeEventListener("click",setIntermediateMode)
        hardButton.removeEventListener("click",setHardMode)
  
    }
}        
function displayBoard()
{
                                        //board.appendChild(box) // Every node matching #board id has a child called box now. (The one above !)
                                        //box.innerText = 1 //int 1 is added in our <div class="box"></div> box
    for (let i = 1; i <= aNumber; i++)       //For i starting at 1, excute the code in brackets until i reaches 10, add 1 each time ALL of the 
    {
        var localHourglassID = hourglassID
        const newbox = box.cloneNode()              //Create a const newbox and it takes the same properties as the node box
        newbox.innerText = i                        //Inside the newbox variable looking like <div class ="newbox"></div> put i between tags
        board.appendChild(newbox)                   //To display the new boxes we have to appen the new node newbox to the parent node board
        newbox.addEventListener("click",function () //to each newbox on the board add an EvenListener that will call the unnamed function above each time newbox is clicked
        {
            if (i == nb)                                                    //The player has to click the number 1 first, then 2, etc.
            {
            mode == hard ? shuffleChildren(board): console.log("HARDE");     //When hard mode is activated shuffle the board each time the click is valid                 
            console.log("Boxle n°"+i+",  click !")      //Display "boxle n°i, click !" in console
            newbox.classList.add("box-valid")           //add the class "box-valid" when clicked                                                                                    
                //1
                if (nb == board.children.length)                             //The case when the player wins.
                {
                alert("You win !")                                       //It checks if nb is egal to the numbers of boxes. When it is, it means the player wins.
                board.querySelectorAll(".box").forEach(function(box)     //Select all "box" class and do showReaction forr each box
                {             
                    showReaction("success", box)  
                })
                clearInterval(localHourglassID)                      //The interval we made when we entered high score mode is removed : the timer stops                 
                document.querySelector("#points").appendChild(pointsDiv)
                let points = hourglass()
                pointsDiv.innerHTML = "Yours points : " + points*modifierScore
                highScore = "off"                                       //Resets the game   
                time = 600         
                nb = 0
                } 
            nb++           
            }
            //2 
            else if (nb < i)                            //The case when the player hits a higher number than the one he's supposed to click.
            {
                showReaction("error",newbox)             //Displays this message and resets the count to one.
                    if (mode == intermediate || mode == hard) 
                {
                    shuffleChildren(board)  //Shuffles the board again when the player is wrong
                }            
                nb = 1
                board.querySelectorAll(".box-valid").forEach(function(validBox)
                {
                    validBox.classList.remove("box-valid")
                })
            }
            //3
            else
            {
                showReaction("notice",newbox)
            }
        }, {once: true});
    }    
}
//___________________________INITIALIZATION_________________________________________________________
var mode                //Easy, intermediate or Hard
var modifierScore = 1
let time = 600
var highScore = "off"
let nb = 1
var hourglassID 
const easy = "easy"
const intermediate = "intermediate"
const hard = "hard"
const easyButton = document.querySelector("#easy")  
const intermediateButton = document.querySelector("#intermediate") 
const hardButton = document.querySelector("#hard") 
const highScoreMode = document.querySelector("#highScoreMode")
const box = document.createElement("div")       // Declaration of a "box" constant creating "div" tags in the HTML document when used
const board = document.querySelector("#board")      /*Declaration of a box constant returning the first element that
                                                     is descendant of a node matching id #board selector*/
mode = easy
const timer = document.querySelector("#timer")
points = hourglass * 2500
const timerDiv = document.createElement("div")
const pointsDiv = document.createElement("div")

//______________________________EVENT LISTENERS BUTTONS_____________________

easyButton.addEventListener("click",setEasyMode)
intermediateButton.addEventListener("click",setIntermediateMode)
hardButton.addEventListener("click",setHardMode)
highScoreMode.addEventListener("click",setHighScore)      //We need a "standarized" mode for high scores so it's faire and comptetitive

//___________________________________LANDING ON PAGE___________________________________________
do
{
    var aNumber = parseInt(window.prompt("Please enter a number from 1 to 100", ""), 10);     //prompt always return a string so we use parseInt to convert it
}                                                                                           //to a an int.
while(isNaN(aNumber) || aNumber > 100 || aNumber < 1);      //If we enter an NaN, a number greater than 100 or 0 or less it will do what's is in scope above
//________________________________________________________________________________________________


box.classList.add("box")                       //Each box element is given a class "box"
displayBoard()
shuffleChildren(board)                              //function is called to display to board and so all the elements in it will appear as well
