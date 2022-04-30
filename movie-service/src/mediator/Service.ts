import { IModel, IService } from "./interface";


export class Service implements IService<IModel> {
    convert_csv_toJSON  (data: IModel) {
        console.log("convert csv to json successful ", data)

    };
    convert_json_toCSV (data: IModel) {
        console.log("convert json to csv successful ", data)
    };

    send_mail(data: IModel) {
        console.log("sending mail is sent successfully ")
    }

    send_sms(data: IModel) {
        console.log("sending sms is sent successfully ")
    }


    print() {
        console.log("service is done")
    }
}