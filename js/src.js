console.log("Hello");
showNotes();

let addBtnId = document.getElementById('addBtnId');
addBtnId.addEventListener("click", function(e){

    let txtId = document.getElementById('txtId');
    let titleId = document.getElementById('titleId');
    let notes = localStorage.getItem("notes");
    let titleTxt = localStorage.getItem("titleTxt");

    
    if(titleTxt==null){
        titleNo = [];
    }
    else{
        titleNo = JSON.parse(titleTxt)
    }
    if (titleId.value.length > 0){ 
        titleNo.push(titleId.value);
    }
    else{
        titleNo.push("Untitled");
    }
    localStorage.setItem("titleTxt", JSON.stringify(titleNo));
    titleId.value = "";
    
    
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    if (txtId.value.length > 0){ 
       notesObj.push(txtId.value);
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    txtId.value = "";
    
    console.log(notesObj);
    console.log(titleNo);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    let titleTxt = localStorage.getItem("titleTxt");

    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    
    if(titleTxt==null){
        titleNo = [];
    }
    else{
        titleNo = JSON.parse(titleTxt)
    }
    
    let html = "";
    notesObj.forEach(function(element,index) {
        html += `<div class="noteCard card my-2 mx-auto" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${titleNo[index]} </h5>
          <p class="card-text"> ${element} </p>
          <button id="${index}" onclick="deleteNote(this.id)" href="#" class="btn btn-sm btn-danger">Delete</button>
        </div>
        </div>
        `;
    })

    let notesElm = document.getElementById("notes");

    if (notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `No Notes Currently, Please add one.`
    }

}

function deleteNote(index){
    console.log(`Delete`);

    let titleTxt = localStorage.getItem("titleTxt");
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index,1);
    titleNo.splice(index,1);
    
    localStorage.setItem("titleTxt", JSON.stringify(titleNo));
    localStorage.setItem("notes", JSON.stringify(notesObj));
    
    showNotes(); 

}

let search = document.getElementById("searchId");
search.addEventListener("input", function(){
    inputVal = search.value.toLowerCase();
    // console.log("Fired",inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let titleTxt2 = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal) || titleTxt2.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
     })
}) 
