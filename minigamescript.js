
function shuffleChildren(parent)
{
    let children = parent.children          //Children becomes the infant of parent paramater given above
    let i = children.length, k, temp        //Variables i, k and temp are declared. i takes the value of the number of objects of children in all board const
    while(--i > 0)                          // Each time all the code in scope is executed, retire 1 to i, code in scope is executed until i reaches 0
    {
        k = Math.floor(Math.random() * (i+1))   // store in k the greatest int less than or equal to a random number between 0 and 1 times i+1
        temp = children[k]                      // temp gives k postition in board
        children[k] = children[i]               //k position in board is replaced by i position in the same board
        parent.appendChild(temp)                // Node temp is added to board 
    }    
}

const box = document.createElement("div")       // Declaration of a "box" constant creating "div" tags in the HTML document when used
box.classList.add("box");                       //we manipulate the list of class of constant box (which is empty) and add a new "box" class

const board = document.querySelector("#board")      /*Declaration of a box constant returning the first element that
                                                     is descendant of a node matching id #board selector*/

let nb = 1

                                    //board.appendChild(box) // Every node matching #board id has a child called constant box now. (The one above !)
                                    //box.innerText = 1 //int 1 is added in our <div class="box"></div> box
for (let i = 1; i <= 10; i++)       //For i starting at 1, excute the code in brackets until i reaches 10, add 1 each time ALL of the 
                                    //instructions in the brackets are done 
{
    const newbox = box.cloneNode()              //Create a newbox variable and give a clone of the node box.
    newbox.innerText = i                        //Inside the newbox variable looking like <div class ="newbox"></div> put i between tags
    board.appendChild(newbox)                   //To display the new boxes we have to appen the new node newbox to the parent node board
    newbox.addEventListener("click",function() //to each newbox on the board add an EvenListener that will call the unnamed function above each time newbox is clicked
    {
        if (i == nb)                                //The player has to click the number 1 first, then 2, etc.
        {
        console.log("Boîte n°"+i+",  click !")      //Display "boite n°i, click !" in console
        newbox.classList.add("box-valid")            //add the class "box-valid" when clicked            
            //1
            if (nb == board.children.length)        //The case when the player wins.
            {                                       //It checks if nb is egal to the numbers of boxes. When it is, it means the player has won.
                board.querySelector(".box").forEach(function(box)
                {
                    showReaction("sucess", box)
                })
            }
        nb++            
        }
        //2 
        else if (nb < i)                            //The case when the player hits a higher number than the one he's supposed to click.
        {
            showReaction("error",newbox)             //Displays this message and resets the count to one.
            nb = 1
        }
        //3
        else
        {
            showReaction("notice",newbox)
        }
    })
}

function showReaction(type, clickedBox)
{
    clickedBox.classList.add(type)
    if (type !== "success")
    {
        setTimeout(function()
        {
            clickedBox.classList.remove(type)
        }, 800)
    }
}
// 
/*for (let i = 1; i <= 10; i++)
{
    let newbox = box.cloneNode()            *******
    newbox.innerText = i                    *Garbage code 
    board.appendChild(box)                  *******
}
*/
shuffleChildren(board)                              //function is called to display to board and so all the elements in it will appear as well

