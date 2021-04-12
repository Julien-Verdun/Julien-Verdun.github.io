let todolistdiv = document.getElementById("mytodolist");
let imgadd = document.getElementById("imgadd");
let inputadd = document.getElementById("inputadd");

let mytodolist = ["Faire les courses", "Acheter du pain", "Their ff cds"];

function buildToDoList() {
  while (todolistdiv.firstChild) {
    todolistdiv.removeChild(todolistdiv.firstChild);
  }

  mytodolist.forEach((todo, idx) => {
    let node = document.createElement("div");
    node.className = "todoelt row";

    let text = document.createElement("span");
    text.innerHTML = todo;
    let deleteSign = document.createElement("img");
    deleteSign.src = "delete.svg";
    deleteSign.setAttribute("value", idx);
    deleteSign.alt = "delete image";
    deleteSign.className = "deletesign";
    deleteSign.addEventListener("click", (event) => {
      mytodolist.splice(event.target.getAttribute("value"), 1);
      buildToDoList();
    });

    node.appendChild(deleteSign);
    node.appendChild(text);

    todolistdiv.appendChild(node);
  });
}

imgadd.addEventListener("click", (event) => {
  mytodolist.push(inputadd.value);
  buildToDoList();
  inputadd.value = "";
});

inputadd.addEventListener("change", (event) => {
  mytodolist.push(inputadd.value);
  buildToDoList();
  inputadd.value = "";
});

buildToDoList();
