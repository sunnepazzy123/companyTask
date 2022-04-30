
import logger from "../logger/winston";
import { IComponent, IComponentType, IModel } from "./interface";
import { Mediator } from "./Mediator";



export class Component implements IComponent<IComponentType<IModel>>{
    
    constructor(private mediator: Mediator, public name: string){}

    publish(msg: IComponentType<IModel>) {
        logger.info(`Component ${this.name} is publishing a ${msg.type} method`)
        msg.name = this.name
        this.mediator.publish(msg, this)
    };

    subscribe(msg: IComponentType<IModel>) {
        logger.info(`Component ${this.name} is subscribing to ${msg.type} method`)
        this.consume(msg)
    };

    unsubscribe(msg: IComponent<IComponentType<IModel>>) {
        logger.info(`Component ${this.name} is unsubscribed`)
    };

    consume(msg: IComponentType<IModel>) {
        switch(msg.type){
            case "create":
                this.mediator.send_mail(msg.data)
                break
            case "get":
                this.mediator.send_sms(msg.data)
                // this.mediator.convert_csv_toJSON(msg.data)
                // break
            default:
                this.mediator.print()
                
        }
    }

}