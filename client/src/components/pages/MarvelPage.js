import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList'
import RandomChar from '../randomChar/RandomChar';
import { useState } from 'react';
import './MarvelPage.scss'

const MarvelPage=()=>{
  const [selectedChar,setChar]=useState(null);

    
  const onCharSelected=(id)=>{
      setChar(id);
  }
  return(
    <div className="Marvel__Page">
      <RandomChar/>
    
      <div className="char__content">
                  <CharList onCharSelected={onCharSelected} />
                  {/* <CharInfo charId={selectedChar}/>          */}
      </div>
    </div>
  )
}

export default MarvelPage;