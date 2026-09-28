import { useState } from "react";

export function useDisableSize(){
    const [sizeAva , setSizeAva] = useState({S : true , M : true , L : true , addToCart : true})
    function disbaleSize(curProducData){
        let sizePerQuant = curProducData.inventory;
        sizePerQuant.S ===  0 ? setSizeAva(prev =>({...prev, S : false})) : null;
        sizePerQuant.M ===  0 ? setSizeAva(prev =>({...prev, M : false})) : null;
        sizePerQuant.L ===  0 ? setSizeAva(prev =>({...prev, L : false})) : null;

        if(sizePerQuant.S === 0 && sizePerQuant.M === 0 && sizePerQuant.L === 0){
            setSizeAva(prev =>({...prev, addToCart : false}))
        }
    }

    return {disbaleSize,sizeAva}
}