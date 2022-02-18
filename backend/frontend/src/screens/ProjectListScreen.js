import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listProjects,
  deleteProject,
  createProject,
} from '../actions/projectActions';
import { PROJECT_CREATE_RESET } from '../constants/projectConstants';

const ProjectListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const projectList = useSelector((state) => state.projectList);
  const { loading, error, projects } = projectList;

  const projectDelete = useSelector((state) => state.projectDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = projectDelete;

  const projectCreate = useSelector((state) => state.projectCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    project: createdProject,
  } = projectCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PROJECT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/project/${createdProject._id}/edit`);
    } else {
      dispatch(listProjects());
    }
  }, [
    dispatch,
    history,
    userInfo,
    match,
    successDelete,
    successCreate,
    createdProject,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
      console.log('delete project');
    }
  };

  const createProjectHandler = () => {
    dispatch(createProject());
  };

  return (
    <Container>
      <h1>Projects</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Assignee</th>
              <th>Description</th>
              <th>Lat</th>
              <th>Long</th>
              <th>Start Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Completed Date</th>
              <th>Customer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project._id}</td>
                <td>{project.title}</td>
                <td>{project.employee}</td>
                <td>{project.description}</td>
                <td>{project.lat}</td>
                <td>{project.lon}</td>
                <td>{project.created_at}</td>
                <td>{project.due_date}</td>
                <td>{project.status}</td>
                <td>{project.completed_on}</td>
                <td>{project.customer}</td>
                <td>
                  <LinkContainer to={`/admin/project/${project._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(project._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ProjectListScreen;
