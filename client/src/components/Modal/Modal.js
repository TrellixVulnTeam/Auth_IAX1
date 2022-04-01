import './Modal.scss'
import { closeModal } from '../weatherList/WeatherSlice';
import { useDispatch } from 'react-redux';


const Modal=({active,children})=>{
const dispatch=useDispatch()

  return(
    <div className={active? 'modal active':'modal'} onClick={()=>dispatch(closeModal())}>
      <div className={active? 'modal__content active':'modal__content'} onClick={(e)=>e.stopPropagation()}>
          {children}
      </div>
    </div>
  )
}
export default Modal;