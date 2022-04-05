import './Modal.scss'
import { closeModal } from '../weatherList/WeatherSlice';
import { useDispatch } from 'react-redux';


const Modal=({active,children})=>{
const dispatch=useDispatch()

  return(
    <div className={active? 'modal active__modal':'modal'} onClick={()=>dispatch(closeModal())}>
      <div className={active? 'modal__content active__modal':'modal__content'} onClick={(e)=>e.stopPropagation()}>
          {children}
      </div>
    </div>
  )
}
export default Modal;