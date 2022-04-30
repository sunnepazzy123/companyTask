
import { IComponent, IComponentType, IModel} from "./interface";
import { Service } from "./Service";

export class Mediator extends Service {
    static _instance: Mediator = undefined
    constructor (
        private components: IComponent<IComponentType<IModel>>[] = [], 
        ) {
        super();
    }

    static getInstance() {
        if(!this._instance){
            this._instance = new Mediator();
        }
        return this._instance
    }

    register(component: IComponent<IComponentType<IModel>>) {
        this.components.push(component)
    };

    publish(msg: IComponentType<IModel>, _component: IComponent<IComponentType<IModel>>){
        for(const component of this.components){
            if(component != _component){
                component.subscribe(msg)
            }
        }
    };

    
}