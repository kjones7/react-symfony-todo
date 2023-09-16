import React, {ChangeEvent, useEffect, useState} from "react";
import {Col, Container, Row, Form, Button, Card, InputGroup, Dropdown} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

function NoteCard({ id, note, deleteNoteHandler }: { id: number, note: Note, deleteNoteHandler: (key: number) => void }) {
  return (
    <Card style={{marginBottom: '1rem'}} className="shadow border-light-subtle">
      <Card.Body>
        <Card.Text>{note.content}</Card.Text>
      </Card.Body>
      <Card.Footer>
          <Dropdown>
            <Dropdown.Toggle variant="link" className="float-end caret-off text-decoration-none text-body">
              <i className="bi-three-dots-vertical card-footer-btn"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                  href="#"
                  onClick={() => deleteNoteHandler(id)}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </Card.Footer>
    </Card>
  );
}

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

type Note = {
  id: number,
  content: string,
};

export default Todo;
