const notesEl = document.getElementById('notes')
const editBtn = document.getElementById('edit')
const deleteBtn = document.getElementById('delete')

const noteBody = notesEl.querySelector('.note-body')
const noteTextArea = notesEl.querySelector('.note-edit-text')

editBtn.addEventListener('click',()=>{
  noteBody.classList.toggle('hidden')
  noteTextArea.classList.toggle('hidden')
})

noteTextArea.addEventListener('input', (e)=> {
  const { value } = e.target;
  
  noteBody.innerHTML = marked(value);
})