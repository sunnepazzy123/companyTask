
import { IComponent, IComponentType, IService } from "./interface";
import { Service } from "./Service";

export class Mediator extends Service {
    static _instance: Mediator = undefined
    constructor (
        private components: IComponent<IComponentType<any>>[] = [], 
        ) {
        super();
    }

    static getInstance() {
        if(!this._instance){
            this._instance = new Mediator()
            return this._instance
        }
        return this._instance
    }

    add(component: IComponent<IComponentType<any>>) {
        this.components.push(component)
    };

    notify(msg: IComponentType<any>, _component: IComponent<IComponentType<any>>){
        for(const component of this.components){
            if(component != _component){
                component.recieve(msg)
            }
        }
    };

    
}