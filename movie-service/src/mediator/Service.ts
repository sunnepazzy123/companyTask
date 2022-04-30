import { IComponentType, IService } from "./interface";


export class Service implements IService<IComponentType<any>> {
    convert_csv_toJSON  (data: IComponentType<any>) {
        console.log("convert csv to json successful ", data)

    };
    convert_json_toCSV (data: IComponentType<any>) {
        console.log("convert json to csv successful ", data)
    };

    send_mail(data: IComponentType<any>) {
        console.log("sending mail is sent successfully ", data)
    }

    send_sms(data: IComponentType<any>) {
        console.log("sending sms is sent successfully ", data)
    }


    print() {
        console.log("service is done")
    }
}