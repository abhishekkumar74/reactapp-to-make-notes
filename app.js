// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]); // Array to store notes
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Load notes from local storage on initial render
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    setNotes(storedNotes ? JSON.parse(storedNotes) : []);
  }, []);

  // Save notes to local storage on changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Function to handle creating a new note
  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  // Function to handle deleting a note
  const handleDeleteNote = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this note?');
    if (confirmation) {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
    }
  };

  // Function to handle searching notes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Search should be case-insensitive
  };

  // Function to filter notes based on search query
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery) ||
    note.content.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="App">
      <h1>React Notes App</h1>
      <NoteForm onAddNote={handleAddNote} />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <NoteList notes={filteredNotes} onDeleteNote={handleDeleteNote} />
    </div>
  );
}

export default App;
