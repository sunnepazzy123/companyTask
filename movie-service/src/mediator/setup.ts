import { Component } from "./Component";
import { Mediator } from "./Mediator";

const mediator = Mediator.getInstance();
const appComponent = new Component(mediator, "appComponent")
export const authComponent = new Component(mediator, "authComponent")


export const mediatorSetup = () => {
    mediator.add(authComponent)
    mediator.add(appComponent)
}




