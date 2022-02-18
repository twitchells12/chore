import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProjectDetail, updateProject } from '../actions/projectActions';
import { PROJECT_UPDATE_RESET } from '../constants/projectConstants';
import moment from 'moment';

const ProjectEditScreen = ({ match, history }) => {
  const projectId = match.params.id;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [completedDate, setCompletedDate] = useState('');

  const dispatch = useDispatch();

  const projectDetail = useSelector((state) => state.projectDetail);
  const { loading, error, project } = projectDetail;

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = projectUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_RESET });
      history.push('/admin/projectlist');
    } else {
      if (!project.title || project._id !== Number(projectId)) {
        dispatch(listProjectDetail(projectId));
      } else {
        setTitle(project.title);
        setDescription(project.description);
        setLat(project.lat);
        setLon(project.lon);
        setDueDate(project.due_date);
        setStatus(project.status);
        setCompletedDate(project.completed_on);
      }
    }
  }, [dispatch, projectId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const dueDateUpdate = moment(dueDate).format('YYYY-MM-DD');
    console.log(typeof dueDateUpdate);
    dispatch(
      updateProject({
        _id: projectId,
        title,
        description,
        lat,
        lon,
        dueDate,
        status,
        completedDate,
      })
    );
  };

  return (
    <div>
      <Link className="btn btn-light my-3" to="/admin/projectlist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Project</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="string"
                placeholder="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="string"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="lat">
              <Form.Label>Lat</Form.Label>
              <Form.Control
                type="string"
                placeholder="lat"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="lon">
              <Form.Label>Lon</Form.Label>
              <Form.Control
                type="string"
                placeholder="Lon"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="string"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="CompletedDate">
              <Form.Label>Completed Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Completed Date"
                value={completedDate}
                onChange={(e) => setCompletedDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProjectEditScreen;
