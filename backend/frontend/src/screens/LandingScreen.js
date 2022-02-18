import React, { useState, useEffect } from 'react';
import gir from '../assests/gir.png';
import logo from '../assests/st_logo.png';

function LandingScreen() {
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);

  useEffect(() => {}, [isLeft, isRight]);

  const mouseLeft = () => {
    setIsLeft(true);
    setIsMouseInside(true);
  };
  const mouseRight = () => {
    setIsRight(true);
    setIsMouseInside(true);
  };

  return (
    <div
      className={`land-wrapper ${
        isLeft & isMouseInside
          ? ' hover-left '
          : isRight & isMouseInside
          ? ' hover-right'
          : ''
      }`}
    >
      <div
        onMouseEnter={mouseLeft}
        onMouseLeave={() => setIsMouseInside(false) & setIsLeft(false)}
        className="left"
      >
        <img src={gir} className="limg" />
        <h1 className="lh1">Employees</h1>
        <a href="#" className="lbtn">
          Login
        </a>
      </div>
      <div
        onMouseEnter={mouseRight}
        onMouseLeave={() => setIsMouseInside(false) & setIsRight(false)}
        className="right"
      >
        <img src={logo} className="limg" />
        <h1 className="lh1">Customers</h1>
        <a href="#" className="lbtn">
          Login
        </a>
      </div>
    </div>
  );
}

export default LandingScreen;
