import { useEffect, useState } from "react";

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function Tranasctions() {
    const { primaryWallet } = useDynamicContext();

    const [balance, setBalance] = useState("");

    useEffect(() => {
        const fetchBalance = async () => {
            if (primaryWallet) {
                const value = await primaryWallet.connector.getBalance();
                setBalance(String(value));
            }
        };
        fetchBalance();
    }, [primaryWallet]);

    return (
        <main className="p-4">
            <div className='flex-col flex w-full items-start mt-3'>
                <p>Current balance</p>
                <h2 className='font-bold text-4xl'>${balance}.00</h2>
            </div>
            <div className='center w-full flex-col mt-[5rem] '>
                <div className='between w-full'>
                    <h3 className='font-semibold'>Tranasctions</h3>
                    <p className='text-gray-400 text-sm'>all</p>
                </div>
                <div className='text-sm w-full text-left mt-8'>You currently have no tranasction</div>
            </div>
        </main>
    )
}