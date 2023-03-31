const box = document.createElement("div") // Declaration of a "box" constant creating "div" tags in the HTML document when used
box.classList.add("box"); //we manipulate the list of class of constant box (which is empty) and add a new "box" class

const board = document.querySelector("#board") /*Declaration of a box constant returning the first element that
                                                     is descendant of a node matching id #board selector*/
board.appendChild(box) // Every node matching #board id has a child called constant box now. (The one above !)
box.innerText = "One" //String "One" is added in our <div class="box"></div> box
for (let i = 1; i <= 10; i++)       //For i starting at 1, excute the code in brackets until i reaches 10, add 1 each time ALL of the instructions in the brackets
                                    // are done 
{
    let newbox = box.cloneNode()        //Create a newbox variable and give a clone of the node box.
    newbox.innerText = i                //Inside the newbox variable looking like <div class ="newbox"></div> put i between tags
    board.appendChild(newbox)           //To display the new boxes we have to appen the new node newbox to the parent node board
}                                   // 
for (let i = 1; i <= 10; i++)
{
    let newbox = box.cloneNode()
    newbox.innerText = i
    board.appendChild(box)
}