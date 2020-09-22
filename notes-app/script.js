const addBtn = document.getElementById("add");

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote() {
  const note = document.createElement("div");
  note.classList.add("notes-container");

  note.innerHTML = `
    <div class="note-header">
      <button id="edit"><i class="fas fa-edit"></i></button>
      <button id="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
  <div class="note-body hidden"></div>
    <textarea class="note-edit-text"></textarea>
  `
  document.body.appendChild(note);

  const editBtn = note.querySelector("#edit");
  const deleteBtn = note.querySelector("#delete");

  const noteBody = note.querySelector(".note-body");
  const noteTextArea = note.querySelector(".note-edit-text");

  editBtn.addEventListener("click", () => {
    noteBody.classList.toggle("hidden");
    noteTextArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
  });

  noteTextArea.addEventListener("input", (e) => {
    const { value } = e.target;
    noteBody.innerHTML = marked(value);
  });
}

{
  /* <div id="notes" class="notes-container">
<div class="note-header">
  <button id="edit"><i class="fas fa-edit"></i></button>
  <button id="delete"><i class="fas fa-t rash-alt"></i></button>
</div>
<div class="note-body hidden"></div>
<textarea class="note-edit-text"></textarea>
</div> */
}
