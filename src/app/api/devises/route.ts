import { NextApiRequest } from "next";
import Device from "../../../../lib/models/Device";
import connectDB from "../../../../lib/mongodb";
import { IUser } from "../../../../types/types";
import mongoose from "mongoose";
import { MONGODB_URI_SERVER } from "../../../../axios/clientAxios";
// export default handler;
export const dynamic = "force-static";

export async function GET() {
    await connectDB();

    const resDB = await Device.find();

    return Response.json({ resDB });
}

export async function POST(req: Request) {
    const { deviseId, initDate } = (await req.json()) as IUser & { status: boolean };
    await connectDB();

    // const isFind = await Device.find({ deviseId });

    // const newDevice = new Device({
    //     deviseId,
    //     initDate,
    // });

    try {
        // const saved = await newDevice.save();
        //return Response.json({ saved, status: true });

        // const result = await Device.findOneAndUpdate({ deviseId: deviseId }, { $setOnInsert: { deviseId: deviseId, initDate: Date.now() } }, { upsert: true, new: true });

        let devise = await Device.findOne({ deviseId: deviseId });
        if (!devise) {
            devise = new Device({ deviseId: deviseId, initDate: Date.now() });
            await devise.save();
        }
        return Response.json({ devise, status: true });
    } catch (error) {
        return Response.json({ status: true });
    }
}

export async function DELETE(req: Request) {
    await connectDB();
    const { _id } = (await req.json()) as IUser;
    const res = await Device.findOneAndDelete({ _id });
    return Response.json({ res });
}
