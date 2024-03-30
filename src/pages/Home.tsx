import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Logo from "../components/common/Logo";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { brandLogos } from "../utils/brands";
import { Connection, PublicKey } from "@solana/web3.js";
import { IoMdNotificationsOutline } from "react-icons/io";

interface TokenDetail {
  mint: string;
  balance: string;
}

export default function Home() {
  const { user, primaryWallet } = useDynamicContext();

  const [balance, setBalance] = useState("");
  const [tokens, setTokens] = useState<TokenDetail[]>([]);


  const rpcUrl =
    "https://devnet.helius-rpc.com/?api-key=87a8dfd7-7df8-4361-a406-40cb5201f179";
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
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
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
        console.error("Error fetching tokens:", error);
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
    <main className="h-screen pb-[4rem] w-screen !overflow-hidden flex-col flex bg-black p-5 text-white">
      <div className="w-full flex between items-start">
        <Logo />

        <Link to="/notifications">
          <IoMdNotificationsOutline size={20} color="#fff" />
        </Link>
      </div>
      <div className="flex-col flex w-full items-start my-16">
        <p>
          Hi,{" "}
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        </p>
        <h1 className="font-medium text-3xl">Welcome back</h1>
      </div>

      <div className="flex-col flex w-full font-regular items-start">
        <p>Account balance</p>
        <h2 className="font-bold text-4xl">${balance}.00</h2>
      </div>

      {/* <button className='mt-[3rem] bg-white text-black p-3 rounded-lg font-semibold' onClick={() => signMessage(primaryWallet)}>Sign Message</button> */}
      <div className="w-full flex-col gap-10 between mt-[1rem]">
        <div className="center w-full gap-6">
          <Link
            to="/send"
            className="w-full center gap-2 text-center bg-[#06FFC3] text-black p-3 font-medium"
          >
            <p>Send</p>
            {/* <IoIosSend size={20} /> */}
          </Link>
          <Link
            to="/receive"
            className="w-full text-center bg-white text-black p-3 font-medium"
          >
            Recieve
          </Link>
        </div>

        <div className="center w-full overflow-x-scroll gap-4">
          <div className="center flex-col gap-2 mr-10">
            <img
              src="../assets/images/spotify.png"
              className="border border-white p-1 rounded-full w-14 h-14 center"
            />
            <p></p>
          </div>
          <div className="center w-full overflow-x-scroll gap-4">
            {tokens.map((token, index) => (
              <div key={index} className="center flex-col gap-2 mr-10">
                {/* Here you can use the mint or another identifier to fetch and display the token image */}
                <img
                  src={`../assets/images/token-placeholder.png`} // Replace this with actual token image path
                  className="border border-white p-1 rounded-full w-14 h-14 center"
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

      <div className="center w-full flex-col mt-[6rem]">
        <div className="between w-full">
          <h3 className="font-regular">Recent tranasctions</h3>
          <Link
            to="/transactions"
            className="text-gray-400 font-regular text-sm"
          >
            show all
          </Link>
        </div>
        <div className="text-[.7rem] w-full text-left font-regular mt-4">
          You currently have no tranasction
        </div>
      </div>
    </main>
  );
}
