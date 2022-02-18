import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { listProjectDetail } from '../actions/projectActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProjectDetail = ({ match }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState('');

  const projectDetail = useSelector((state) => state.projectDetail);
  const { loading, error, project } = projectDetail;

  const userDetails = useSelector((state) => state.userDetails);
  const user = userDetails;

  useEffect(() => {
    dispatch(listProjectDetail(match.params.id));
    setAvatar(user.avatar);
  }, [match, dispatch]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <ListGroup variant="flush" key={project._id}>
              <ListGroup.Item>
                <h3>{project.project_name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {project.description}
              </ListGroup.Item>
              <ListGroup.Item>Status: {project.status}</ListGroup.Item>
              <ListGroup.Item>Workers: {project.workers}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProjectDetail;
