import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearAllDogs } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import './Landing.css';

export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAllDogs())
  }, [dispatch])

  return (
    <div>
      <div className="container" >
        <div className="bienvenida">
              <h1>PI - Maria Celina de la Cruz Riz</h1>
              <Link to="dogs">
                <button type="button">Start</button>
              </Link>
        </div>
      </div>
    </div>
  )}