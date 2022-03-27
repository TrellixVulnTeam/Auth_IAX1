const useIpServices=()=>{
  const _apiBase='http://ipwhois.app/json/'

  const getUserIp=async()=>{

    const request=async(_apiBase)=>{
      try{
        const response=await fetch(_apiBase);
        if (!response.ok){
          throw new Error(`Could not fetch ${_apiBase} status: ${response.status}`)
        }
        const data=await response.json();
        return data;
      }catch(e){
        throw e;
      }
    }
    return request(_apiBase)
  }
  return {getUserIp} 
}

export default useIpServices;