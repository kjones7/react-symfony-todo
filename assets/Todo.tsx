import React, { ChangeEvent, useState } from "react";
import {Col, Container, Row, Form, Button, Card, InputGroup, Dropdown} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

function NoteCard({ id, note, deleteNoteHandler }: { id: number, note: string, deleteNoteHandler: (key: number) => void }) {
  return (
    <Card style={{marginBottom: '1rem'}} className="shadow border-light-subtle">
      <Card.Body>
        <Card.Text>{note}</Card.Text>
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
  const [notes, setNotes] = useState<string[]>([]);

  function handleAddBtnClick() {
    if (noteToAdd.trim() === '') return; // Prevent adding empty notes
    setNotes([...notes, noteToAdd]);
    setNoteToAdd('');
  }

  function handleNoteToAddChange(event: ChangeEvent<HTMLInputElement>) {
    setNoteToAdd(event.target.value);
  }

  function deleteNote(key: number) {
    var newNotes : string[] = [];
    notes.forEach((note, index) => {
      if (index !== key) {
        newNotes.push(note)
      }
    });
    setNotes(newNotes);
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
            />
            <Button variant="primary" onClick={handleAddBtnClick}>
              Add
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {notes.map((note, index) => (
          <Col xl={2} lg={3} md={6}>
            <NoteCard
                key={index}
                id={index}
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
