import './ExchangeValue.css'
import Spinner from 'react-bootstrap/Spinner'
import useConversionServices from '../../services/ConversionApi';
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector,getState } from 'react-redux';
import {changeValue,changeConvertValue,changeInputValue,onUpdateLocal} from './ValueSlice.js'


const ExchangeValue=()=>{

const [currency,setCurrency]=useState('1');
const [inputVal,setInputVal]=useState('USD');
const [convertVal,setConvertVal]=useState('RUB')
const {spinner,result,convertCurrency}=useSelector(store=>store.value)
const dispatch=useDispatch()

const request=()=>{
  dispatch(changeValue(inputVal))
}

 useEffect(()=>{
  dispatch(changeInputValue(inputVal))
  dispatch(changeConvertValue(convertVal))
  // console.log(currency)
  request();
 },[convertVal,inputVal,currency])

const changeInputVal=(e)=>{
  setInputVal(e.target.value)
  // dispatch(changeInputValue(inputVal))
}
const changeConvertVal=(e)=>{
  setConvertVal(e.target.value)
  // dispatch(changeConvertValue(convertVal))
}

const onUpdate=(e)=>{
  const currency=e.target.value;
  setCurrency(currency);
  dispatch(onUpdateLocal(currency))
  
}

const spinnerView=spinner?  <Spinner animation="border" size='sm' variant="dark" />:null;
const content=result?<Result currency={currency} inputVal={inputVal} convertCurrency={convertCurrency} convertVal={convertVal}/>:null;

return(
    <>
    <h2>Convert</h2>
    <div className='convert'>
    <div className='convertBlock'>
      <label>From
    <select value={inputVal} onChange={changeInputVal}>
        <option value='USD'>USD $</option>
        <option value='RUB'>RUB ₽</option>
        <option value='EUR'>EUR €</option>
        <option value='JPY'>JPY ¥</option>
        <option value='BRL'>BRL R$</option>
        <option value='AMD'>AMD ֏</option>

    </select>
    </label>
    <label>Amount
    <input type="number"
            className="convert-input"
            placeholder="..."
            value={currency}
            onChange={onUpdate}
            />
    </label>   
            <label> To
     <select value={convertVal} onChange={changeConvertVal}>
        <option value='USD'>USD $</option>
        <option value='RUB'>RUB ₽</option>
        <option value='EUR'>EUR €</option>
        <option value='JPY'>JPY ¥</option>
        <option value='BRL'>BRL R$</option>
        <option value='AMD'>AMD ֏</option>
    </select>
    </label>
    
    </div>
    <div className='convertResult'>
      <button onClick={request}> Convert {spinnerView} </button>
      {content}
    </div>
    </div>
  
    </>
  )
}

const Result=({currency,inputVal,convertCurrency,convertVal})=>{
  return(
    <div>{currency} {inputVal} is {convertCurrency} {convertVal}</div> 
  )
}
export default ExchangeValue;