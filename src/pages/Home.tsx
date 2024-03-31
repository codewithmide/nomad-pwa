import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import Logo from '../components/common/Logo';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { brandLogos } from "../utils/brands";
import { Connection, PublicKey } from '@solana/web3.js';
import { IoMdNotificationsOutline } from 'react-icons/io';

interface TokenDetail {
  mint: string;
  balance: string;
}

export default function Home() {
  const { user, primaryWallet } = useDynamicContext();

  const [balance, setBalance] = useState('');
  const [tokens, setTokens] = useState<TokenDetail[]>([]);

  const rpcUrl =
    'https://devnet.helius-rpc.com/?api-key=87a8dfd7-7df8-4361-a406-40cb5201f179';
  const connection = new Connection(rpcUrl);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!primaryWallet?.address) return;

      try {
        // Fetch token accounts by owner
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          new PublicKey(primaryWallet.address),
          {
            programId: new PublicKey(
              'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
            ),
          }
        );

        // Iterate over each token account to fetch additional details
        const tokenDetails = await Promise.all(
          tokenAccounts.value.map(async (account) => {
            // Get mint information
            const mintInfo = await connection.getParsedAccountInfo(
              account.account.data.parsed.info.mint
            );

            console.log(mintInfo);

            // Get token balance
            const balance = await connection.getTokenAccountBalance(
              account.pubkey
            );

            return {
              mint: account.account.data.parsed.info.mint,
              balance: balance.value.amount,
              // Additional metadata can be added here
            };
          })
        );

        setTokens(tokenDetails);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };

    fetchTokens();
  }, [primaryWallet]);

  console.log(tokens);

  // const primaryWalletAddress = primaryWallet?.address;

  // const connector = primaryWallet?.connector;

  // const signMessage = async (primaryWallet: any) => {
  //   if (!primaryWallet) return null;
  //   else {
  //     console.log(primaryWallet.address);
  //   }

  //   const signer = await primaryWallet.connector.getSigner();

  //   return signer ? await signer.signMessage("example") : null;
  // };

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
    <main className='flex min-h-screen w-screen flex-col !overflow-hidden bg-black p-5  pb-[5rem] text-white'>
      <div className='between flex w-full items-start'>
        <Logo />

        <Link to='/notifications'>
          <IoMdNotificationsOutline size={20} color='#fff' />
        </Link>
      </div>
      <div className='my-16 flex w-full flex-col items-start'>
        <p>
          Hi,{' '}
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        </p>
        <h1 className='font-medium text-3xl'>Welcome back</h1>
      </div>

      <div className='flex w-full flex-col items-start font-regular'>
        <p>Account balance</p>
        <h2 className='font-bold text-4xl'>${balance}.00</h2>
      </div>

      {/* <button className='mt-[3rem] bg-white text-black p-3 rounded-lg font-semibold' onClick={() => signMessage(primaryWallet)}>Sign Message</button> */}
      <div className='between mt-[1rem] w-full flex-col gap-10'>
        <div className='center w-full gap-6'>
          <Link
            to='/send'
            className='center w-full gap-2 bg-[#06FFC3] p-3 text-center font-medium text-black'
          >
            <p>Send</p>
            {/* <IoIosSend size={20} /> */}
          </Link>
          <Link
            to='/receive'
            className='w-full bg-white p-3 text-center font-medium text-black'
          >
            Recieve
          </Link>
        </div>

        <div className='center w-full gap-4 overflow-x-scroll'>
          {/* <div className='center mr-10 flex-col gap-2'>
            <img
              src='../assets/images/spotify.png'
              className='center h-14 w-14 rounded-full border border-white p-1'
            />
            <p></p>
          </div> */}
          <div className='center w-full gap-4 overflow-x-scroll'>
            {tokens.map((token, index) => (
              <div key={index} className='center mr-10 flex-col gap-2'>
                {/* Here you can use the mint or another identifier to fetch and display the token image */}
                <img
                  src={`../assets/images/token-placeholder.png`} // Replace this with actual token image path
                  className='center h-14 w-14 rounded-full border border-white p-1'
                />
                <p>{token.balance}</p> {/* Display token balance */}
              </div>
            ))}
          </div>
          {/* {brandLogos.map((brand, index) => (
            <div key={index} className="center flex-col gap-2">
              <div className="w-[4rem] h-[4rem]">
                <img
                  src={brand.image}
                  className="border border-white p-1 rounded-full center"
                />
              </div>
              <p className="text-sm">{brand.name}</p>
            </div>
          ))} */}
        </div>
      </div>

      <div className='center mt-[6rem] w-full flex-col'>
        <div className='between w-full'>
          <h3 className='font-regular'>Recent tranasctions</h3>
          <Link
            to='/transactions'
            className='font-regular text-sm text-gray-400'
          >
            show all
          </Link>
        </div>
        <div className='mt-4 w-full text-left font-regular text-[.7rem]'>
          You currently have no tranasction
        </div>
      </div>
    </main>
  );
}
