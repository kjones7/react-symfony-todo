import React, { ChangeEvent, useState } from "react";
import {Col, Container, Row, Form, Button, Card, InputGroup} from "react-bootstrap";

function NoteCard({ note }: { note: string }) {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }} className="shadow">
      <Card.Body>
        <Card.Text>{note}</Card.Text>
      </Card.Body>
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

  return (
    <Container fluid className="ps-5 pe-5">
      <Row className="justify-content-center mt-5 mb-3">
        <Col xs={3}>
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
      <Row className="gap-3">
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </Row>
    </Container>
  );
}

export default Todo;
