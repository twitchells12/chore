import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Project = ({ project }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Header className="card_dropdown">
        <i className="fas fa-ellipsis-h"></i>
      </Card.Header>
      <Card.Body className="card_body">
        <Link to={`/project/${project._id}`}>
          <Card.Title as="div">
            <strong>
              {project._id} {project.title}
            </strong>
          </Card.Title>
        </Link>

        <Card.Subtitle className="card_subtitle">
          <i className="fas fa-flag flag"></i> Due {project.due_date}
        </Card.Subtitle>
        <Card.Text as="div">
          <div className="my-3 desc">{project.description}</div>
        </Card.Text>
        <Card.Text>{project.status}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Project;
