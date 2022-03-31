import './CharInfo.scss';
import { useState,useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import Sceleton from '../sceleton/Sceleton';
import {Link} from 'react-router-dom';
import {getInfoCharacter} from '../charList/CharSlice'
import { useDispatch, useSelector } from 'react-redux';

const CharInfo =()=>{
  const {infoChar,selectedId,loading,error}=useSelector(store=>store.char)
  const dispatch=useDispatch();
  
  useEffect(() => {
    updateChar();
    console.log(infoChar)
  }, [selectedId])
  
  const  updateChar=()=>{
          if(!selectedId){
              return;
          }
    dispatch(getInfoCharacter(selectedId))  
    }
    
    const sceleton= selectedId || loading || error ? null:<Sceleton/>
    const errorMessage = error ? <h2>Error</h2>: null;
    const spinner = loading ?  <Spinner animation="border" /> : null;
    const content = !(loading || error|| !selectedId) ? <View char={infoChar} /> : null;
        return (
            <div className="char__info">
             {sceleton}
             {errorMessage}
             {spinner}
             {content}
            </div>
        )
    
    
}

const View=({char})=>{
    const {name,description,thumbnail,homepage,wiki,comics}=char;
    const content=comics?.length ?  <>{            
        comics.slice(0,10).map((item,id)=>{
            return(
                
                    <li key={id} className="char__comics-item">
                       {item.name}
                    </li>
                
            )
        })
    }</>: <div>Not Data Yet</div>
    return(
        <>
          <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                   {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                {content}  
                </ul>
        </>
    )
}



export default CharInfo;