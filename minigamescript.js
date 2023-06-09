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
    let minuts = parseInt(time / 60, 10)                    //1 minute is made of 60 seconds 
    let seconds = parseInt(time % 60, 10)                   //Seconds are the remainders of the division of time/60 : so we use modulo sign % 
  
    minuts = minuts < 10 ? "0" + minuts : minuts            //Display format: We want to display minuts with two numbers
    seconds = seconds < 10 ? "0" + seconds : seconds        //Display format : same as comment above
  
    timer.innerText = minuts + ":" + seconds                //there  display the timer in the timer divs
    time = time <= 0 ? 0 : time - 1                         //Checking so we can't go below 0
    return time                                             //Return so we can get the time value back
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
        timerDiv.innerHTML = hourglassID                                        //Each second function hourglass is called    
        removeAllChildNodes(board)                          //Remove all children of board : those are the inital boxes
        highScore = "on"                                    //Highscore mode enabled
        aNumber = 10  
        displayBoard()        
        shuffleChildren(board)                 
        document.querySelector("#timer").appendChild(timerDiv)                  //Makes the timer appear
        easyButton.removeEventListener("click",setEasyMode)                     //For fairness high scores are separated by categories
        intermediateButton.removeEventListener("click",setIntermediateMode)
        hardButton.removeEventListener("click",setHardMode)
        gameEnded = false                                                       //The game is replayable each time it is completed and player click high scores    
        if (importedArray == null)
        {

        }
        else
        {
            pointsArray = pointsArray.concat(importedArray)                                 //If the player had previous highscores the pointsArray will contain 
            if (importedArray.length == 1)       //If the played had one high score         All of them 
            {
                removeAllChildNodes(topScores)                                              
                topScores.appendChild(newTopScoresLi).innerHTML = "1 :" + pointsArray[0]        
            }
            else if (importedArray.length == 2)                                                 //When the player had 2 HS registered
            {  
                removeAllChildNodes(topScores)
                topScores.appendChild(newTopScoresLi).innerHTML = "1 :" + pointsArray[0]
                topScores.appendChild(newTopScoresLi2).innerHTML = "2 :" + pointsArray[1]                
            }
            else
            {
                removeAllChildNodes(topScores)
                topScores.appendChild(newTopScoresLi).innerHTML = "1 :" + pointsArray[0]
                topScores.appendChild(newTopScoresLi2).innerHTML = "2 :" + pointsArray[1]
                topScores.appendChild(newTopScoresLi3).innerHTML = "3 :" + pointsArray[2]       
            }
        }
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
        newbox.addEventListener("click",function()  //to each newbox on the board add an EvenListener that will call the unnamed function above each time newbox is clicked
        {
            if (i == nb && gameEnded == false)      //The player has to click the number 1 first, then 2, etc. gameEnded is a switch that will activate to true in the end
            {                                       //And the game will be over : box won't interact
            mode == hard ? shuffleChildren(board): console.log("HARDE");        //When hard mode is activated shuffle the board each time the click is valid                 
            console.log("Boxle n°"+i+",  click !")                              //Display "boxle n°i, click !" in console
            newbox.classList.add("box-valid")                                   //add the class "box-valid" when clicked                                                                                    
                //1
                if (nb == board.children.length)                             //The case when the player wins.
                {
                alert("You win !")                                       //It checks if nb is egal to the numbers of boxes. When it is, it means the player wins.
                board.querySelectorAll(".box").forEach(function(box)     //Select all "box" class and do showReaction forr each box
                {             
                    showReaction("success", box)  
                })
                if (highScore == "on")         
                {
                    clearInterval(localHourglassID)                      //The interval we made when we entered high score mode is removed : the timer stops                 
                    document.querySelector("#points").appendChild(pointsDiv)
                    let points = (hourglass() * 2500)                                       //hourglass returns time, biggers points are cooler
                    pointsArray.unshift(points*modifierScore)                       //Add the new score in the pointsArray array in index 0 
                    pointsDiv.innerHTML = "Yours points : " + points*modifierScore
                    const newLeaderboarLi = leaderboardLi.cloneNode() 
                    leaderboards.appendChild(newLeaderboarLi).innerHTML = "Old Score :"+ points*modifierScore   //Put a remainder of the score got last game
                    topScoresCount += 1                     
                    pointsArray.sort(function(a, b){return b-a})                                    //See w3 doc : sorting array in descending order  
                    if (topScoresCount == 1)                                                        //Case when the player only played once
                    {
                        if (pointsArray.length == 1)                                                
                        {                                                                           //This means this is the 1rst time the game is played
                            removeAllChildNodes(topScores)                                          //Because the imported array was empty and we did unshift above
                            topScores.appendChild(newTopScoresLi).innerHTML = "1 :" + pointsArray[0]
                        }
                        else if (pointsArray.length == 2)                                               //Force this display when there is only on high score stored
                        {
                            removeAllChildNodes(topScores)               
                            topScores.appendChild(newTopScoresLi).innerHTML = "1 :" + pointsArray[0]
                            topScores.appendChild(newTopScoresLi2).innerHTML = "2 :" + pointsArray[1]
                        }
                        else                                                                            //This covers when player has already 2 high scores stored
                        {                                                                               //and more 
                            removeAllChildNodes(topScores)     
                            topScores.appendChild(newTopScoresLi).innerHTML = "1 :" + pointsArray[0]
                            topScores.appendChild(newTopScoresLi2).innerHTML = "2 :" + pointsArray[1]
                            topScores.appendChild(newTopScoresLi3).innerHTML = "3 :" + pointsArray[2]                             
                        }
                    }
                    else if (topScoresCount == 2)                                                   //case when the played has played twice 
                    {     

                        if (pointsArray.length == 2)                                                //case when the player has played twice and has no local scores
                        {
                            removeAllChildNodes(topScores)                 
                            topScores.appendChild(newTopScoresLi).innerHTML = "1 :" + pointsArray[0]
                            topScores.appendChild(newTopScoresLi2).innerHTML = "2 :" + pointsArray[1]
                        }
                        else
                        {
                            removeAllChildNodes(topScores)            
                            topScores.appendChild(newTopScoresLi).innerHTML = "1 :" + pointsArray[0]
                            topScores.appendChild(newTopScoresLi2).innerHTML = "2 :" + pointsArray[1]         
                            topScores.appendChild(newTopScoresLi3).innerHTML = "3 :" + pointsArray[2]               
                    }
                }
                else if(topScoresCount == 3)                                                    //Case when the player has played thrice or more
                {                                                                               //We display the leaderboards and they will refresh
                                                                                                //the next time the player refreshes the game.
                    removeAllChildNodes(topScores)                                              //Remove nodes to create new updated ones                       
                    topScores.appendChild(newTopScoresLi).innerHTML = "1 :" + pointsArray[0]
                    topScores.appendChild(newTopScoresLi2).innerHTML = "2 :" + pointsArray[1]
                    topScores.appendChild(newTopScoresLi3).innerHTML = "3 :" + pointsArray[2]
                }             
                window.localStorage.setItem("imported", JSON.stringify(pointsArray.slice(0,3))) //Exporting highscores in localstorage : on the 3 best
                newLeaderboarLi.classList.add("highrank")               //Add nothing is the display for now
                highScore = "off"                                       //Resets the game : timer is reset, nb=0 because it will turn 1 because of nb++
                time = 600         
                }
                nb = 0
                gameEnded = true                                        //Condition so we can't click on the boxes after completing the game                                     
            }    
            nb++                                                        //after a success player needs to click +1 higher number box
            }
            //2 
            else if (nb < i && gameEnded == false)                            //The case when the player hits a higher number than the one he's supposed to click.
            {
                showReaction("error",newbox)             //Displays this message and resets the count to one.
                    if (mode == intermediate || mode == hard) 
                {
                    shuffleChildren(board)  //Shuffles the board again when the player is wrong
                }            
                nb = 1
                board.querySelectorAll(".box-valid").forEach(function(validBox)     //Selecting all box-valid on board and for each of them
                {
                    validBox.classList.remove("box-valid")                          // ...remove the class
                })
            }
            //3
            else if (gameEnded == false)
            {
                showReaction("notice",newbox)
            }
            else
            {

            }
        })                                             
    }    
}
//___________________________INITIALIZATION_________________________________________________________
var mode                    //Easy, intermediate or Hard
var modifierScore = 1       //Base modifier is played does not select any mode
let time = 600              //Ten minuts
var highScore = "off"       //Base game has no HS
let nb = 1                  //Will be use as a counter for the game 
var hourglassID             //Variable that will be used in displayBoard to stop the timer from ticking 
let gameEnded = false       //We won't be able to click again after all boxes are clicked
let pointsArray = []        //All of the points will be contained is the array
let topScoresCount = 0      //Will be used to help to display the cases when there are only 1 or 2 last scores
const easy = "easy"         //Gameplay modes           
let importedArray = JSON.parse(window.localStorage.getItem("imported"))         //Import highscores if some were saved
const intermediate = "intermediate"
const hard = "hard"
const easyButton = document.querySelector("#easy")                  //Will select the #easy id button
const intermediateButton = document.querySelector("#intermediate") 
const hardButton = document.querySelector("#hard") 
const highScoreMode = document.querySelector("#highScoreMode")
const box = document.createElement("div")       // Declaration of a "box" constant creating "div" tags in the HTML document when used
const board = document.querySelector("#board")      /*Declaration of a box constant returning the first element that
                                                     is descendant of a node matching id #board selector : in short select #board*/
mode = easy
const timer = document.querySelector("#timer")
const leaderboards = document.querySelector("#leaderboards")
const topScores = document.querySelector("#topScores")
const timerDiv = document.createElement("div")
const pointsDiv = document.createElement("div")
const leaderboardLi = document.createElement("li")
const topScoresLi = document.createElement("li")
const newTopScoresLi = topScoresLi.cloneNode()          //Used to add multiple li itemps to the list
const newTopScoresLi2 = newTopScoresLi.cloneNode()      //Declaring them nox to gain some lines
const newTopScoresLi3 = newTopScoresLi.cloneNode()   

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
console.log(importedArray)
