import React, { useEffect, useState } from 'react';
import Dog from './Dog';
import Pagination from './Pagination';
import { getAlldogs } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import './Dogs.css'

export default function Dogs() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const navigate = useNavigate();
  const dogs = useSelector(state => state)
  useEffect(() => {  
    dispatch(getAlldogs())
  },[dispatch] )
  
  const indexPostAnterior = currentPage * dogsPerPage;
  const indexPrimerPost = indexPostAnterior - dogsPerPage;
  const currentDogs = !dogs.searchDog ? dogs.allDogs?.slice(indexPrimerPost, indexPostAnterior) :
    dogs.searchDog?.slice(indexPrimerPost, indexPostAnterior)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <div className="containerDogs">
        {
          !dogs.searchDog ? !dogs.allDogs ? 
          <>
              <div className="agrupador">
                <div className="notFind">
                  <div className="notFindImg">
                    <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmU2MDk3YmQ1MTdlNjVhNjAzODc1ZjZlZjQzMGVlMjQ2YzA2MTI2NSZjdD1n/QyPl5qEQnBIu2ZQwTx/giphy.gif" alt="Loading ..." />
                  </div>
                  <div className="mensaje">

                  <h2>Loading ...</h2>
                  </div>
                </div>

              </div>

            </> 
           :
            <>

              <div className="agrupador">
                <div className="dogs">
                  {currentDogs?.map(p => (
                    <Dog
                      key={p.id}
                      image={p.image}
                      name={p.name}
                      temperament={p.temperament}
                      weight={p.weight}
                      id={p.id}
                    />
                  ))}
                </div>

                <div className="botonera">
                     
                  <Pagination
                    dogsPerPage={dogsPerPage}
                    totalDogs={dogs.allDogs.length}
                    paginate={paginate} />
                       
                </div>
              </div>

            </>
            :
            dogs.searchDog.length === 0 ? 
            <>
              <div className="agrupador">
                <div className="notFind">
                  <div className="notFindImg">
                    <img src="https://media2.giphy.com/media/xT0xeuOy2Fcl9vDGiA/giphy.gif?cid=ecf05e474uhc8ou6srct63gnpp5jobqhzks9tn3vxf8rjrrf&rid=giphy.gif&ct=g" alt="Not Find anything" />
                  </div>
                  <div>
                      <h2>The breed you were looking for was not found ...</h2>
                  </div>
                  <div className="botonDetail">
                    <button onClick={()=> navigate('/dogs')}>Volver</button>
                  </div>  
                </div>

              </div>

            </> :
              <>
                <div className="agrupador">
                  <div className="dogs">
                    {currentDogs?.map(p => (
                      <Dog
                        key={p.id}
                        image={p.image}
                        name={p.name}
                        temperament={p.temperament}
                        weight={p.weight}
                        id={p.id}
                      />))}
                  </div>
                  <div className="botonera">
                    <Pagination
                      dogsPerPage={dogsPerPage}
                      totalDogs={dogs.searchDog.length}
                      paginate={paginate} />
                  </div>
                </div>
              </>
        }
      </div>
    </div>
  )
}