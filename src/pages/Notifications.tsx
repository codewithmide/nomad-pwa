import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <main className="p-5 bg-black text-white w-screen h-screen overflow-hidden">
      <div className="w-full between border-b pb-3 border-gray-700">
        <Link to="/" className="center gap-2">
          <IoIosArrowBack color="#fff" size={15} />
          <p className="text-sm font-light">Back</p>
        </Link>
      </div>
      <p className="text-2xl mt-10">Notifications</p>
      <div className="overflow-y-auto">
        <p className="text-[.7rem] w-full text-left font-regular mt-4">
          You currently have no notificaation
        </p>
      </div>
    </main>
  );
};

export default Notifications;
