
import logger from "../logger/winston";
import { IComponent, IComponentType } from "./interface";
import { Mediator } from "./Mediator";

export class Component implements IComponent<IComponentType<any>>{
    
    constructor(private mediator: Mediator, private name: string){}

    notify(msg: IComponentType<any>) {
        logger.info(`Component ${this.name} is publishing a ${msg.type} method`)
        msg.name = this.name
        this.mediator.notify(msg, this)
    };

    recieve(msg: IComponentType<any>) {
        logger.info(`Component ${this.name} is subscribing to ${msg.type} method`)
        this.consume(msg)
    };

    consume(msg: IComponentType<any>) {
        switch(msg.type){
            case "create":
                this.mediator.mail(msg.data)
                break
            case "get":
                this.mediator.print()
                break
            default:
                this.mediator.print()
        }
    }

}