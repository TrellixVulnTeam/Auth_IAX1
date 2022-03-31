import { useState,useEffect } from 'react';
import './RandomChar.scss';
import Spinner from 'react-bootstrap/Spinner'
// import useMarvelServices from '../../services/MarvelServices';
import mjolnir from '../../resources/img/mjolnir.png';
// import ErrorMessage from '../errorMessage/ErrorMessage';
import {getCharacter} from '../charList/CharSlice'
import { useDispatch, useSelector } from 'react-redux';


const RandomChar=()=>{
  const dispatch=useDispatch()
  const {rndChar}=useSelector(store=>store.char)
  useEffect(() => {
    updateChar();
  },[])
  
  const updateChar = () => {
    // clearError();//для того чтобы была возможность поменять персонажа после того выскачет ошибка
    const id = Math.floor(Math.random()*(1011400-1011000)+1011000);
    dispatch(getCharacter(id))
              
              
  }

   
    // const errorMessage = error ? <h2>Error</h2>: null;
    // const spinner = loading ?  <Spinner animation="border" />: null;
    // const content = !(loading || error) ? <View char={char} onCharSelected={()=>props.onCharSelected(char.id)}/> : null;
    const content=<View char={rndChar} />
    return (
      <div className="randomchar">
        {/* {errorMessage}если null то просто ничего не будет рендерится */}
        {/* {spinner} */}
        {content}
          <div className="randomchar__static">
              <p className="randomchar__title">
                  Random character for today!<br/>
                  Do you want to get to know him better?
              </p>
              <p className="randomchar__title">
                  Or choose another one
              </p>
              <button className="button button__main">
                  <div onClick={updateChar} className="inner">try it</div>
              </button>
              <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
          </div>
      </div>
  )
  
   
}

const View = ({char}) => {
  const { name, description, thumbnail, homepage, wiki, } = char;
  let CharImg = "randomchar__img" ;
  if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") CharImg="randomchar__no__img"
 
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={ CharImg}/>
              <div className="randomchar__info">
            <p  className="randomchar__name">{ name}</p>
                  <p className="randomchar__descr">
                     {description}
                  </p>
                  <div className="randomchar__btns">
                      <a href={homepage} className="button button__main">
                          <div className="inner">homepage</div>
                      </a>
                      <a href={wiki} className="button button__secondary">
                          <div className="inner">Wiki</div>
                      </a>
                  </div>
              </div>
          </div>
  )
}
export default RandomChar;