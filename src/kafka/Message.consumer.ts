import { Injectable,Logger,OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { UsersService } from "src/users/users.service";
@Injectable()
export class MessageConsumer implements OnModuleInit{
    constructor(
        private readonly consumerService:ConsumerService,
        private readonly userService:UsersService,
    ){};
    async onModuleInit() {
        await this.consumerService.consume(
            {topics:['test-topic']},
            {
                eachMessage:async({topic,partition,message})=>{
                    let value:string|undefined;
                    
                    value=message.value?.toString('utf-8');
                    console.log("Vallujes ",value)
                    if (value) {
                        let data:{service:string,action:string,data:any}=JSON.parse(value);
                        console.log(
                            "Data ",data
                        )
                        switch(data.action){
                            case "create":
                                try{
                                    await this.userService.create(data.data)
                                    console.warn("User Created Successfully")
                                }catch(error){
                                    console.error("Error In Creating the User");
                                }
                                break;
                            default:
                                Logger.error("Action Not Found");
                        }
                    }else{
                        Logger.log("value are not present")
                    }
                    
                    // console.log({http://164.160.187.141:8000
                    //     topic:topic.toString(),
                    //     partition:partition.toString(),
                    //     message:message.value?.toString()
                    // })
                    
                }
            }
        )
    }
}