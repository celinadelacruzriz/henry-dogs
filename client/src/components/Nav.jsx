import React, { useEffect, useState } from 'react'
import {
  getTemperaments,
  clearAllDogs,
  filterTemperament, filterOrigin,
  orderAZ, clearSearch, orderWeightAsc, orderWeightDesc,
  orderZA,
  searchbar
} from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import perritos from '../assets/dog.png';
import './Nav.css'

export default function Nav() {
  const [buscar, setBuscar] = useState({
    name: '',
  })

  const selects = 'DEFAULT'
  const search = (e) => {
    setBuscar({ name: e.target.value })
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch]);

  const temps = useSelector(state => state.temps)
  const dogs = useSelector(state => state.allDogs)

  const filter = (e) => {
    dispatch(filterTemperament((e.target.value).toLowerCase()))

  }
  const query = (e) => { e.preventDefault(); dispatch(searchbar(buscar.name)); setBuscar({ name: '' }) }
  const vertodos = () => dispatch(clearSearch())

  const orderRaza = (e) => {
    if ((e.target.value) === 'asc') return dispatch(orderAZ());
    if ((e.target.value) === 'des') return dispatch(orderZA());
    return
  }
  const origin = (e)=> {    
    if((e.target.value) === 'all') return dispatch(clearSearch())
    return dispatch(filterOrigin(e.target.value));
      }

      
  const orderWeight = (e) => {
    if ((e.target.value) === 'asc') return dispatch(orderWeightAsc());
    if ((e.target.value) === 'des') return dispatch(orderWeightDesc());
    return
  }
  return (
    <div className="navegacion">
      {!dogs?.length ? null :
        <>
          <nav className="navbar">
            <Link to='/dogs'>
              <div className="imgNavBar" onClick={vertodos}>
                <img src={perritos} alt="perritos" height='50%' width='50%'/>
              </div>
            </Link>
       
            <div className="navDiv">
              <ul className="list-ul">
                <li className="list-li">
                  <select onChange={origin}  defaultValue={'DEFAULT'}>
                    <option value='all' >Show All</option>
                    <option value='api' >Existing Breeds</option>
                    <option value='db' >Breeds Created</option>
                  </select>
                </li>
                <li className="list-li">
                  <select onChange={filter} value={selects}>
                    <option value='DEFAULT' >Filter of Temperament</option>
                    {temps?.map(t => (
                      <option key={t.id} value={t.name} >{t.name}</option>
                      ))}
                  </select>
                </li>
                <li className="list-li">
                  <select onChange={orderWeight} defaultValue={selects} >
                    <option value='DEFAULT'>Order by weight</option>
                    <option value='asc'>Ascendente</option>
                    <option value='des'>Descendente</option>
                  </select>
              </li>
              <li className="list-li">
                <select onChange={orderRaza} value={selects}>
                  <option value='DEFAULT'  >Order by Name</option>
                  <option value='asc'>Ascendente</option>
                  <option value='des'>Descendente</option>
                </select>
              </li>            
            </ul>
            <div className="line2">
              <form className="form-inline" onSubmit={query}>
                <input className="form-control" placeholder="Buscar por raza" onChange={search} value={buscar.name}></input>
                  <button >Buscar</button>
              </form>
              <Link to="/dog">
                <button onClick={()=>dispatch(clearAllDogs())} >Crear Nueva Raza</button>
              </Link>
            </div>
          </div>
        </nav>
      </>
    }
    </div>
)}
