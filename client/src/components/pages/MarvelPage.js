import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList'
import RandomChar from '../randomChar/RandomChar';
import { useState } from 'react';
import './MarvelPage.scss'

const MarvelPage=()=>{
 
  return(
    <div className="Marvel__Page">
      <RandomChar/>
    
      <div className="char__content">
                  <CharList  />
                  <CharInfo />         
      </div>
    </div>
  )
}

export default MarvelPage;