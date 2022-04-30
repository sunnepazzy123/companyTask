export interface IComponent<IComponentType> {
    notify: (msg: IComponentType) => void,
    recieve: (msg: IComponentType) => void
}

export interface IComponentType<T> {
    type: string,
    data: T,
    name?: string
}


export interface IService<T> {
    send_mail: (data: T) => void
    send_sms: (data: T) => void
    convert_csv_toJSON: (data: T) => void
    convert_json_toCSV: (data: T) => void

}