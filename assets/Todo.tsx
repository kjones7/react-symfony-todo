import React, { ChangeEvent, useState } from "react";
import { Col, Container, Row, Form, Button, Card } from "react-bootstrap";

function NoteCard({ note }: { note: string }) {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>{note}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
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
    <Container>
      <Row>
        <Col xs={3}>
          <Form.Control
            type="text"
            placeholder="Write a note..."
            value={noteToAdd}
            onChange={handleNoteToAddChange}
          />
        </Col>
        <Col xs={3}>
          <Button variant="primary" onClick={handleAddBtnClick}>
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </Row>
    </Container>
  );
}

export default Todo;
