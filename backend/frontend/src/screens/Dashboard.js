import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import { listProjects } from '../actions/projectActions';

function Dashboard() {
  const dispatch = useDispatch();

  const projectList = useSelector((state) => state.projectList);
  const { loading, error, projects } = projectList;

  useEffect(() => {
    dispatch(listProjects());
  }, [dispatch]);

  const vals = projects.map((project) => project.customer);
  console.log(vals);
  var data = [
    {
      values: [],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie',
    },
  ];

  var layout = {
    height: 400,
    width: 500,
  };
  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default Dashboard;
