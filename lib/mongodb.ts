import mongoose from "mongoose";
import { MONGODB_URI, MONGODB_URI_SERVER } from "../axios/clientAxios";

// const connectDB = async () => {
//     if (mongoose.connection.readyState >= 1) {
//         return;
//     }

//     try {
//         await mongoose.connect(process.env.MONGO_SERVER_DEV as string, {
//             //useNewUrlParser: true,
//             // useUnifiedTopology: true,
//         });
//         console.log("Подключение к базе данных успешно!");
//     } catch (error) {
//         console.error("Ошибка подключения к базе данных:", error);
//         process.exit(1);
//     }
// };

// export default connectDB;

// if (!MONGODB_URI) {
//    // throw new Error("Please define the MONGODB_URI environment variable inside .env");
// }

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
