import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "../components/CopyToClipboard";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";

const Receive = () => {
  const userWallets = useUserWallets();

  return (
    <div className="bg-black flex-col between text-white h-screen w-screen between px-3 py-5">
      <div className="w-full between border-b pb-3 border-gray-700">
        <Link to="/" className="center gap-2">
          <IoIosArrowBack color="#fff" size={15} />
          <p className="text-sm font-light">Back</p>
        </Link>
        <div className="capitalize text-sm font-light text-center">Receive Money</div>
      </div>

      <div className="center flex-col gap-4 w-10/12">
        <h2 className="font-medium text-3xl text-center">
          Receive money into your Nomad wallet
        </h2>
        <p className="text-sm font-regular text-center">
          Scan this QR code or copy your wallet address below to receive money
        </p>
      </div>

      <div className="size-[200px] center border-white border">
        qr code here
      </div>

      <div className="bg-white text-black w-11/12 text-wrap rounded-sm">
        <div className="between p-3 gap-3 rounded-sm">
          <div
            id="ref"
            className="overflow-hidden text-[.7rem] text-ellipsis whitespace-nowrap"
          >
            {userWallets.map((wallet) => (
              <p className="font-regular" key={wallet.id}>
                {wallet.address}
              </p>
            ))}
          </div>
          <CopyToClipboard targetId="ref" />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Receive;
