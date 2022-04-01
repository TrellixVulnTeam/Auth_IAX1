import {useHttp} from '../hooks/useHttp'

const useEdamamServices=()=>{

  const _apiBase = 'https://api.edamam.com/';
  const  _apiKeyFood = 'app_key=0967caab91e1215b810f9fa39597f9f6';
  const _apiIdFood='app_id=1eeb79c0'
  const _apiKeyRecipes='app_key=007b4d8509034db5f42cde8cc8f8d0ee'
  const _apiIdRecipes='app_id=a62789ea'
  const {request}=useHttp()

  const  getAutoComplete= async(food)=>{
    const res = await request(`${_apiBase}auto-complete?${_apiIdFood}&${_apiKeyFood}&q=${food}`)
    return res;
  }

  const getFoodData=async(food)=>{
    const res=await request(`${_apiBase}api/recipes/v2?type=public&q=${food}&${_apiIdRecipes}&${_apiKeyRecipes}`)
    return res
  }
  return {getAutoComplete,getFoodData}
}
export default useEdamamServices;