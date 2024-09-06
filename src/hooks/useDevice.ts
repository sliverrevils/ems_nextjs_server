import { clientAxios } from "../../axios/clientAxios";
import { IUser } from "../../types/types";
export const MONGODB_URI = process.env.MONGO_SERVER_DEV;
//export const MONGODB_URI = (process.env.NODE_ENV == "production" ? process.env.MONGO_SERVER_PROD : process.env.MONGO_SERVER_DEV) as string;
export default function useDevice() {
    async function getAllDevices(): Promise<IUser[]> {
        try {
            console.log({ "URL:": process.env });
            const res = (await clientAxios.get("devises")).data.resDB as IUser[];
            return res;
        } catch (error) {
            console.log(`ERROR ${error}`);
        }
        return [];
    }

    async function deleteDevices(id: String): Promise<IUser[]> {
        try {
            console.log({ "URL:": process.env });
            const res = await clientAxios.delete("devises", { data: { _id: id } });

            const all = (await clientAxios.get("devises")).data.resDB as IUser[];

            return all;
        } catch (error) {
            console.log(`ERROR ${error}`);
        }
        return [];
    }

    return { getAllDevices, deleteDevices };
}
