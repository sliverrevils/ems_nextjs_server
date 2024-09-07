"use client";

import useDevice from "@/hooks/useDevice";
import { useEffect, useState } from "react";
import { IUser } from "../../../types/types";

const DevicesPage = () => {
    const [devices, setDevices] = useState<IUser[]>([]);
    const [sortOrder, setSortOrder] = useState("asc");

    //HOOKS
    const { getAllDevices, deleteDevices } = useDevice();

    const handleDelete = (id) => {
        setDevices(devices.filter((device) => device.deviseId !== id));
    };

    const deleteDevise = async (id) => {
        const res = await deleteDevices(id);
        setDevices(res);
    };

    //EFFECTS
    useEffect(() => {
        (async () => {
            setDevices(await getAllDevices());
        })();
    }, []);

    return (
        <div className="p-4">
            {/* <button onClick={() => getAllDevices()}>GET ALL</button> */}
            <h1 className="text-2xl font-bold mb-4">Список устройств</h1>
            {/* <button onClick={() => {}} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                Сортировать по дате инициализации ({sortOrder === "asc" ? "по возрастанию" : "по убыванию"})
            </button> */}
            <ul className="space-y-2">
                {Array.isArray(devices) &&
                    devices!.map((device) => (
                        <li key={Math.random()} className="flex justify-between items-center p-2 border rounded">
                            <span>{`ID: ${device.deviseId}, Дата инициализации: ${device.initDate}`}</span>
                            <button onClick={() => deleteDevise(device._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                Удалить
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default DevicesPage;
