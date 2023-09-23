import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {NoteCard} from "./NoteCard";

function Todo() {
  const [noteToAdd, setNoteToAdd] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes()
      .then((response) => setNotes(response));
  }, []);

  async function fetchNotes() {
    const response = await fetch('/api/v1/notes');
    return response.json();
  }

  function handleAddBtnClick() {
    if (noteToAdd.trim() === '') return; // Prevent adding empty notes
    const tempID = Math.random();
    const newNote : Note = {
      id: tempID,
      content: noteToAdd,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    setNoteToAdd('');
    sendCreateNoteRequest(newNote).then((response) => {
      setNotes(prevNotes => {
        return prevNotes.map(note =>
          note.id === tempID ? { ...note, id: response.id } : note
        );
      });
    });
  }

  function handleNoteToAddChange(event: ChangeEvent<HTMLInputElement>) {
    setNoteToAdd(event.target.value);
  }

  function deleteNote(key: number) {
    var newNotes : Note[] = [];
    notes.forEach((note, index) => {
      if (note.id !== key) {
        newNotes.push(note)
      }
    });
    setNotes(newNotes);
  }

  async function sendCreateNoteRequest(note : Note) {
    const response = await fetch('/api/v1/notes', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    return response.json();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) : void {
    if (event.key === 'Enter') {
      handleAddBtnClick();
    }
  }

  return (
    <Container fluid className="ps-5 pe-5">
      <Row className="justify-content-center mt-5 mb-3">
        <Col xl={3}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Write a note..."
              value={noteToAdd}
              onChange={handleNoteToAddChange}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={handleAddBtnClick}>
              Add
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {notes.map((note, index) => (
          <Col xl={2} lg={3} md={6} key={index}>
            <NoteCard
                key={note.id}
                id={note.id}
                note={note}
                deleteNoteHandler={deleteNote}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Todo;
