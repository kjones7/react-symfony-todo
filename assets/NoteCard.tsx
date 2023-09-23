import { Card, Dropdown } from 'react-bootstrap'
import React from 'react'

export function NoteCard ({ id, note, deleteNoteHandler }: {
  id: number
  note: Note
  deleteNoteHandler: (key: number) => void
}) {
  return (
    <Card style={{ marginBottom: '1rem' }} className="shadow border-light-subtle">
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
              onClick={() => { deleteNoteHandler(id) }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Footer>
    </Card>
  )
}
