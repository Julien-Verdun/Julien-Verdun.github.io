let todolistdiv = document.getElementById("todolistdiv"),
  editimg,
  checkedimg,
  addgroup;

let todoitems = {
  Courses: [
    "Faire les courses",
    "Acheter du pain",
    "Réserver dentiste",
    "Developper une banque en ligne",
  ],
  "To Do": ["Chercher sessrvice comptabilite", "Pas jouer avec mes couilles"],
};

let isEditMode = false;

// let todoitems = ["Faire les courses", "Acheter du pain", "Their ff cds"];

/*
Faire une liste de liste pour faire plusieurs todo
Changer le build des todo pour en construire plusieurs
au clique on accede a une todo specifique en modification 
avec un bouton retour pour revenir a la liste des todo en consultation simple
*/

function buildToDoSection() {
  while (todolistdiv.firstChild) {
    todolistdiv.removeChild(todolistdiv.firstChild);
  }

  let mytodolist = buildToDoList("Courses");

  todolistdiv.appendChild(mytodolist);

  let addGroupDiv = document.createElement("div");
  addGroupDiv.id = "addgroup";
  addGroupDiv.className = "col-6 addgroup";
  let inputaddDiv = document.createElement("input");
  inputaddDiv.id = "inputadd"; //+i
  inputaddDiv.type = "text";
  inputaddDiv.onchange = () => {
    console.log("click on inputadd", isEditMode);
    if (isEditMode) {
      todoitems["Courses"].push(inputadd.value);
      inputadd.value = "";
      buildToDoSection();
    }
  };
  addGroupDiv.appendChild(inputaddDiv);
  let imgaddDiv = document.createElement("img");
  imgaddDiv.id = "imgadd";
  imgaddDiv.className = "image";
  imgaddDiv.src = "./add.svg";
  imgaddDiv.alt = "addImage";
  imgaddDiv.onclick = () => {
    console.log("click on imgadd", isEditMode);
    if (isEditMode) {
      todoitems["Courses"].push(inputadd.value);
      inputadd.value = "";
      buildToDoSection();
    }
  };
  addGroupDiv.appendChild(imgaddDiv);

  todolistdiv.appendChild(addGroupDiv);

  let editimgDiv = document.createElement("div");
  editimgDiv.id = "editimg";
  let imageDiv = document.createElement("img");
  imageDiv.className = "image";
  imageDiv.onclick = () => {
    if (!isEditMode) editMode();
  };
  imageDiv.src = "./editer.svg";
  imageDiv.alt = "editImage";
  editimgDiv.appendChild(imageDiv);
  todolistdiv.appendChild(editimgDiv);

  let checkedimgDiv = document.createElement("div");
  checkedimgDiv.id = "checkedimg";
  imageDiv = document.createElement("img");
  imageDiv.className = "image";
  imageDiv.onclick = () => {
    if (isEditMode) editMode();
    console.log("hello");
  };
  imageDiv.src = "./checked.svg";
  imageDiv.alt = "checkedImage";
  checkedimgDiv.appendChild(imageDiv);
  todolistdiv.appendChild(checkedimgDiv);

  editimg = document.getElementById("editimg");
  checkedimg = document.getElementById("checkedimg");
  addgroup = document.getElementById("addgroup");
}

function buildToDoList(items) {
  // while (mytodolist.firstChild) {
  //   mytodolist.removeChild(mytodolist.firstChild);
  // }
  mytodolist = document.createElement("div");
  mytodolist.id = "mytodolist";
  mytodolist.className = "col-6";

  todoitems[items].forEach((todo, idx) => {
    let node = document.createElement("div");
    node.className = "todoelt row";
    let text = document.createElement("span");
    text.innerHTML = todo;

    if (isEditMode) {
      let deleteSign = document.createElement("img");
      deleteSign.src = "delete.svg";
      deleteSign.setAttribute("value", idx);
      deleteSign.alt = "delete image";
      deleteSign.className = "deletesign";
      deleteSign.onclick = (event) => {
        todoitems[items].splice(event.target.getAttribute("value"), 1);
        buildToDoSection();
        // buildToDoList(items);
      };
      node.appendChild(deleteSign);
    }

    node.appendChild(text);
    mytodolist.appendChild(node);
  });
  return mytodolist;
}

function editMode() {
  addgroup.style.display = !isEditMode ? "block" : "none";
  checkedimg.style.display = !isEditMode ? "block" : "none";
  editimg.style.display = !isEditMode ? "block" : "none";
  console.log(
    addgroup.style.display,
    checkedimg.style.display,
    editimg.style.display
  );
  isEditMode = !isEditMode;
  buildToDoSection();
}

buildToDoSection();

addgroup.style.display = "none";
checkedimg.style.display = "none";
editimg.style.display = "block";
