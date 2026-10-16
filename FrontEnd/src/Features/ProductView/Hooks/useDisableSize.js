import { useState } from "react";

export function useDisableSize(){
    const [sizeAva , setSizeAva] = useState({S : true , M : true , L : true , addToCart : true})
    function disbaleSize(curProducData){
        let sizePerQuant = curProducData.inventory;
        sizePerQuant.S ===  0 ? setSizeAva(prev =>({...prev, S : false})) : setSizeAva(prev =>({...prev, S : true}));
        sizePerQuant.M ===  0 ? setSizeAva(prev =>({...prev, M : false})) : setSizeAva(prev =>({...prev, M : true}));
        sizePerQuant.L ===  0 ? setSizeAva(prev =>({...prev, L : false})) : setSizeAva(prev =>({...prev, L : true}));

        if(sizePerQuant.S === 0 && sizePerQuant.M === 0 && sizePerQuant.L === 0){
            setSizeAva(prev =>({...prev, addToCart : false}))
        }
    }

    return {disbaleSize,sizeAva}
}