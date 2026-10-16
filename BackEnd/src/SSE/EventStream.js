import Product from "../Modals/ProductData.js"
import Orders from "../Modals/Orders.js";
import {broadcastDbUpdates} from "./BroadcastDbUpdates.js"

export function startEventStream(){

    const changeStreamProduct = Product.watch([], {
        fullDocument: "updateLookup"
    });

    const changeStreamOrders = Orders.watch([], {
        fullDocument: "updateLookup"
    });

    function listen(){
        changeStreamProduct.on("change", (change) => {
            broadcastDbUpdates(change.fullDocument,"Product");
        });

        changeStreamOrders.on("change", (change) => {
            broadcastDbUpdates(change.fullDocument,"Order");
        });
    }

    return{changeStreamProduct,changeStreamOrders,listen}

    
}