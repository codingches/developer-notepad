const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');

// Debugging helper function
function log(message, value) {
    console.log(message, value);
}

// Load notes from localStorage
function showNotes() {
    let savedNotes = localStorage.getItem('notes');
    log('Retrieved from localStorage:', savedNotes);

    // Parse notes or set to an empty array if null/invalid
    try {
        savedNotes = JSON.parse(savedNotes) || [];
    } catch (error) {
        log('Error parsing notes from localStorage:', error);
        savedNotes = [];
    }

    // Clear container and populate notes
    notesContainer.innerHTML = '';
    savedNotes.forEach(note => {
        addNoteToDOM(note.content);
    });
}
showNotes();

// Save notes to localStorage
function updateStorage() {
    const notes = Array.from(document.querySelectorAll('.input-box'))
        .map(note => ({
            content: note.textContent.trim() // Trim to avoid unnecessary blank spaces
        }))
        .filter(note => note.content); // Exclude empty notes
    localStorage.setItem('notes', JSON.stringify(notes));
    log('Updated localStorage:', notes);
}

// Add a new note to the DOM
function addNoteToDOM(content = '') {
    const inputBox = document.createElement('p');
    const img = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');
    inputBox.textContent = content; // Set note content
    img.src = "tools/images/delete.png";
    img.alt = "Delete Note";
    img.style.cursor = "pointer";


    // Append elements and add event listeners
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    // Event listener for delete
    img.addEventListener('click', () => {
        inputBox.remove();
        updateStorage();
    });

    // Event listener for editing
    inputBox.addEventListener('keyup', () => {
        updateStorage();
    });
}

// Create a new note
createBtn.addEventListener('click', () => {
    addNoteToDOM();
    updateStorage(); // Update immediately after adding a new note
});

// Prevent default Enter key behavior
document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
});
