import axios from "axios";

//export const MONGODB_URI = "http://localhost:3007/api/";
export const MONGODB_URI_SERVER = (process.env.NODE_ENV == "production" ? "" : process.env.MONGO_SERVER_DEV) as string;
// + "/api/";
//console.log({ "AXIOS ✅": MONGODB_URI });

export const clientAxios = axios.create({
    //baseURL: "http://localhost:3007/api",

    //baseURL: MONGODB_URI,
    baseURL: "api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
