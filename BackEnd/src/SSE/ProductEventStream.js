import Product from "../Modals/ProductData.js"
import {broadcastDbUpdates} from "./BroadcastDbUpdates.js"

export function startProducteventStream(){

    const changeStream = Product.watch([], {
        fullDocument: "updateLookup"
    });

    changeStream.on("change", (change) => {
        console.log("Product changed:", change);

        broadcastDbUpdates(change);
    });
}