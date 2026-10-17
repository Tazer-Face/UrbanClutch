import crypto from "node:crypto";
import { razorpay } from "../../Config/RazorpayObj.js";


export default class VerifyReservationS{
    constructor(Service1 , userRepository1 ,userRepository2 ){
        this.Service1 = Service1;
        this.userRepository1 = userRepository1;
        this.userRepository2 = userRepository2;
    }

    async verifyPayment(id , claimId){
        try{
            let payment = await razorpay.orders.fetch(id)
    
            return payment.status === "paid";
            
        }catch(err){

            try {
                await this.userRepository1.updateReservation(
                { RazorPayOrderId: id ,claimId: claimId },
                { claimId: "", state: "Verify" , claimExpiresAt: null } 
            );
            } catch (updateErr) {
                console.error("Failed to release reservation claim:", updateErr);
            }

            console.error(err)
            return undefined;
        }
    }

    async checkExisitingOrders(id){

            let orders = await  this.userRepository2.getOrders({ RazorPayOrderId : id })
            return orders.length > 0;
        
    }

    async createNewOrder(reservation,claimId){
        try{

                let orderData = {
                    FirebaseUid : reservation.FirebaseUid,
                    RazorPayOrderId : reservation.RazorPayOrderId,
                    Total : reservation.Total,
                    UserData : reservation.UserDetails,
                    OrderDetails : reservation.OrderDetails,
                    status : "Confirmed"
                }
    
    
                let orders = await this.userRepository2.placeOrder([orderData]);
            
            
                if(orders[0].status != "Confirmed"){
                    throw new Error("Order not created")
                }

                return orders;
            
        }catch(err){
            try {
                await this.userRepository1.updateReservation({ 
                    RazorPayOrderId:reservation.RazorPayOrderId ,claimId: claimId },
                    {claimId : "" , state : 'Verify',claimExpiresAt: null}
                );
            
            } catch (updateErr) {
                console.error("Failed to release reservation claim:", updateErr);
            }
            
            console.error(err);
             throw err;
        }
    }

    async rollbackReservation(id , claimId){
        
            await  this.Service1.paymentOrderFailure({ RazorPayOrderId : id },claimId)
            console.log("Reservation rollback successful")   
    }

    async modifyReservation(id , claimId){
        
            let updateReservation = await  this.userRepository1.updateReservation(
                { RazorPayOrderId : id , claimId: claimId ,state: "Claimed" },
                {state : "Closed",claimId: "",claimExpiresAt: null});
    
             if( !updateReservation || updateReservation.state !== "Closed" ){
                    throw new Error("Unable to update reservation");
            }
    }

    async verifyReservation(){
        const claimId = crypto.randomUUID();
        let reservations = await this.userRepository1.updateManyReservation(
            {
                $or : [
                    {state : {$in : ["Active","Verify"]} , 
                    $or: [
                        { claimExpiresAt: { $exists: false } },
                        { claimExpiresAt: null },
                        { claimExpiresAt: { $lte: new Date() } }
                    ]},
                    {
                        state: "Claimed",
                        claimExpiresAt: { $lte: new Date() }
                    }
                ]
            },
            {$set : {claimId : claimId , 
                state : 'Claimed' ,claimExpiresAt : new Date(Date.now() +  10*60*1000)}
            });

        if (reservations.modifiedCount <= 0 ){
            console.log("No active reservations")
            return;
        }

        let availableReservations = await this.userRepository1.getReservation({claimId : claimId})

        const now = new Date();

        let expired = availableReservations.filter(ele =>  now >= new Date(ele.expiresAt));
        let valid = availableReservations.filter(ele =>  now < new Date(ele.expiresAt))

        let batchSizeExpired = 5;
        let expiredRollBack = [];

        for(let i = 0 ; i < expired.length ; i+=batchSizeExpired){
            let batch = expired.slice(i,batchSizeExpired+i)
            let result = await Promise.all(batch.map(async (ele)=>{
                try{
                    console.log("expired")
                    if(ele.payment === "Success"){
                        let orders = await this.checkExisitingOrders(ele.RazorPayOrderId)
                        console.log("Verified as paid by checking payment SUccess status")
                        if(orders === false){
                            await this.createNewOrder(ele,claimId)
                            console.log("Order created by recovery job") 
                            await this.modifyReservation(ele.RazorPayOrderId , claimId)
                            console.log("reservation status changed to closed")
                        }else if (orders === true){
                            await this.modifyReservation(ele.RazorPayOrderId , claimId)
                            console.log("Order exisits , reservation closed")
                        }
                        return
                    }
                    let payment = await this.verifyPayment(ele.RazorPayOrderId ,claimId);

                    if(payment === undefined) return
                    
                    if(payment){
                        let orders = await this.checkExisitingOrders(ele.RazorPayOrderId)
                        console.log("Verified as paid by checking razorypay payment")
                        if(orders === false){
                            await this.createNewOrder(ele,claimId)
                            console.log("Order create by recovery job")
                            await this.modifyReservation(ele.RazorPayOrderId , claimId)
                            console.log("reservation status changed to closed")
                            
                        }else if (orders === true){
                            await this.modifyReservation(ele.RazorPayOrderId ,claimId)
                            console.log("Order exisits , reservation closed")
                        }
                    }
                    else if(payment === false){
                        //await this.rollbackReservation(ele.RazorPayOrderId)
                        console.log("Payment was unsuccessful")
                        return ele
                    }

                }catch(err){
                   
                    try {
                        await this.userRepository1.updateReservation(
                            { RazorPayOrderId:ele.RazorPayOrderId , claimId: claimId },
                            {claimId : "" , state : 'Verify',claimExpiresAt: null}
                        );
                    } catch (updateErr) {
                        console.error("Failed to release reservation claim:", updateErr);
                    }
                    console.error(err)
                }
            }))

            expiredRollBack.push(...result.filter(ele => ele !== undefined))
        }

        for(let i = 0 ; i < valid.length ; i+=batchSizeExpired){
            let batch = valid.slice(i,batchSizeExpired+i)
            await Promise.all(batch.map(async (ele)=>{
                try{
                    console.log("valid")
                    if(ele.payment === "paid"){
                        console.log("verified as paid")
                        let orders = await this.checkExisitingOrders(ele.RazorPayOrderId)

                        if(orders === false){
                            await this.createNewOrder(ele,claimId)
                            console.log("Order created by recovery job")
                            await this.modifyReservation(ele.RazorPayOrderId , claimId)
                            console.log("reservation status changed to closed")
                        }else if (orders === true){
                            await this.modifyReservation(ele.RazorPayOrderId ,claimId)
                            console.log("Order exisits , reservation closed")
                        }
                        return
                    }

                    let payment = await this.verifyPayment(ele.RazorPayOrderId ,claimId);

                    if(payment === undefined) return

                    if(payment){
                        
                        let orders = await this.checkExisitingOrders(ele.RazorPayOrderId)

                        if(orders === false){
                            await this.createNewOrder(ele , claimId)
                            console.log("Order created by recovery job")
                            await this.modifyReservation(ele.RazorPayOrderId , claimId)
                            console.log("reservation status changed to closed")
                        }else if (orders === true){
                            await this.modifyReservation(ele.RazorPayOrderId ,claimId)
                            console.log("Order exisits , reservation closed")
                        }
                    }else if(payment === false){
                        await this.userRepository1.updateReservation(
                            { RazorPayOrderId:ele.RazorPayOrderId , claimId: claimId },
                            {claimId : "" , state : ele.state === "Active" ? "Active" : 'Verify',
                                claimExpiresAt: null
                            }
                        );
                        console.log("Payment was unsuccessful")
                    }
    

                }catch(err){
                    try {
                        await this.userRepository1.updateReservation(
                            { RazorPayOrderId:ele.RazorPayOrderId ,claimId: claimId },
                            {claimId : "" , state : 'Verify',claimExpiresAt: null}
                        );
            
                    } catch (updateErr) {
                        console.error("Failed to release reservation claim:", updateErr);
                    }
                    console.error(err)
                }
            }))
        }

        for(let reservations of expiredRollBack){

                try{
                    console.log("Rolling back expired unsuccessful reservations")
                    await this.rollbackReservation(reservations.RazorPayOrderId,claimId)
                }catch(err){
                    try {
                        await this.userRepository1.updateReservation(
                            { RazorPayOrderId:reservations.RazorPayOrderId ,claimId: claimId },
                            {claimId : "" , state : 'Verify',claimExpiresAt: null}
                        );
                    } catch (updateErr) {
                        console.error("Failed to release reservation claim:", updateErr);
                    }
                }
            
        }
    }
}