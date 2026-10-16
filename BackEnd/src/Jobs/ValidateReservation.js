import cron from 'node-cron'

export class ValidateReservationJob{
    constructor(Service1){
        this.Service1 = Service1
    }

    async validateReservations(){
        cron.schedule("* * * * *",async()=>{
            try{
                console.log("Starting job")
                await this.Service1.verifyReservation()

            }catch(err){
                console.error(err)
            }
        })
    }
}