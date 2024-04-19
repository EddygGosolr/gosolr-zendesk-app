'use client'

import axios from 'axios'
import { headers } from 'next/headers'
import React from 'react'
import { useState } from 'react'
// import { mdata } from '../api/orders/route'


const Orders = () => {

    const [inputText, setInputText] = useState('')
    const [orders, setOrders] = useState<{ [key: string]: any; }[]>([]);
    const [editMode, setEditMode] = useState(false)

    async function fetchOrders() {
        console.log('fetching orders')
        if (!inputText) {
            return
        }
        const data = {
                from: "br5nz6axq",
                where: "{13.EX."+"'"+inputText+"'"+"}",
            }
        const response = await axios.post('https://api.quickbase.com/v1/records/query',
        {
            headers:{
                'Content-Type': 'application/json',
                'QB-Realm-Hostname': 'gosolr.quickbase.com',
                'user-agent': 'Nick',
                'Authorization': 'QB-USER-TOKEN b8iy9e_px5f_0_bikjb3g2kbq5iv2ji6fmtf7tp',
            },
            data: data,
        })

        // const response = mdata
        // Map fields by label
        const fieldsMap: { [key: string]: any } = {};
        response.data.fields.forEach((field: any) => {
            fieldsMap[field.label] = field.id;
        });

        // Map data by field label
        const mappedData: { [key: string]: any }[] = [];
        response.data.forEach((record: any) => {
            const mappedRecord: { [key: string]: any } = {};
            for (const [key, value] of Object.entries(record)) {
                const field = response.data.fields.find((field: any) => field.id.toString() === key);
                if (field) {
                    const fieldId = fieldsMap[field.label];
                    mappedRecord[field.label] = (value as any).value;
                }
            }
            mappedData.push(mappedRecord);
        });
        console.log(mappedData);

        setOrders([mappedData[0]]);
    }

    if (editMode) {
        return (
            <div className='flex flex-col items-center gap-8 pt-8 pb-32'>
                
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center gap-8 pt-8 pb-32'>
            <div className='text-2xl'>
                <h1>Order Details</h1>
            </div>
            <div className='flex gap-2'>
                <input 
                    type='text' 
                    placeholder='Type an order Number' 
                    className='text-md bg-white-100 text-black  p-2 m-2 text-color-black-500'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={fetchOrders} className='text-md  bg-blue-200 text-black p-2 m-2  hover:bg-blue-100'> Search </button>
            
            </div>

            <div className='w-3/6 gap-2'>
                <div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-4">Mapped Data</h2>
                        <div className="overflow-x-auto">
                            <table className="table-fixed border-collapse w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-4 py-2 w-1/3">Field</th>
                                <th className="border border-gray-400 px-4 py-2 w-2/3">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(orders).map(([label, value]) => (
                                    <tr key={label}>
                                        <td className="border border-gray-400 px-4 py-2 break-all">{label}</td>
                                        <td className="border border-gray-400 px-4 py-2 break-all">{String(value)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                </div>
            </div>
            
        </div>
    
    )
}

export default Orders
