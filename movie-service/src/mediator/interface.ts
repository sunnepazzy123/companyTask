export interface IComponent<T> {
    publish: (msg: T) => void,
    subscribe: (msg: T) => void
}

export interface IComponentType<T> {
    type: string,
    data: T,
    name?: string
}

export interface IModel {

}


export interface IService<T> {
    send_mail: (data: T) => void
    send_sms: (data: T) => void
    convert_csv_toJSON: (data: T) => void
    convert_json_toCSV: (data: T) => void

}