import { useNavigate } from "react-router-dom";

export function useProductNavigate(){
    const navigate = useNavigate()

    function viewProduct(address,id=null){
      
      if(address !== null){
        if(id === null){
          navigate(`/${address}`)
        }
        else{
          navigate(`/${address}/${id}`);
        }
      }     
       
    }

    return {viewProduct}
}