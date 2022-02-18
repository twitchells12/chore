import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Project from '../components/Project';
import { listProjects } from '../actions/projectActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const projectList = useSelector((state) => state.projectList);
  const { loading, error, projects } = projectList;

  let keyword = history.location.search;
  console.log(keyword);
  useEffect(() => {
    dispatch(listProjects(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h4>Projects</h4>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {projects.map((project) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Project key={project._id} project={project} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
