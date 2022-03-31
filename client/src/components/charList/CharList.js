import './charList.scss';
import {useState,useEffect} from 'react'
import useMarvelServices from '../../services/MarvelServices';
import Spinner from 'react-bootstrap/Spinner'
import { getData,focusOnItem } from './CharSlice';
import { useDispatch, useSelector,getState } from 'react-redux';

const CharList =()=>{
  const [offset,setOffset]=useState(211);
  const {data,newItemLoading,charEnded,selectedId,firstUpd}=useSelector(store=>store.char)
  const dispatch=useDispatch()
  
  useEffect(() => {
    if (firstUpd) onRequest()
  },[])

  
  const onRequest = () => {
    setOffset(offset=>offset+9)
    dispatch(getData(offset))
  }

 {
    const content =  <Element selectedId={selectedId}  data={data}    />;
    return (
      
      <div className="char__list">
        {content}    
          <button onClick={() => onRequest(offset)} disabled={newItemLoading} style={{ 'display':!charEnded?'none':'block'}} className="button button__main button__long">
              <div className="inner">load more</div>
          </button>
      </div>
    )
  }
   
}

const Element = ({ data,selectedId}) => {
  const dispatch=useDispatch()
  const elements = data.map((item) => {
    const active = (item.id === selectedId);
    const ourClass=active?'char__item char__item_selected':'char__item'
    return(
      <ElementItem
        key={item.id}
        {...item}
        ourClass={ourClass}
        focusOnItem={()=>dispatch(focusOnItem(item.id))}    
      />
    )
      
  })
  return(
    <ul className="char__grid">
        {elements}
    </ul>
  )
}

const ElementItem=(props)=>{
  const { name, thumbnail,focusOnItem,ourClass} = props;
  let CharImg = "char__item__img" ;
  if (thumbnail==="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") CharImg="char__item__no__img"
  
  return(
    <li   tabIndex={0}
          
          onClick={() => {
            focusOnItem();
          }}
          className={ourClass}>
          <img className={CharImg} src={thumbnail} alt="abyss"/>
          <div className="char__name">{name}</div>
    </li> 
  )
}



export default CharList;
