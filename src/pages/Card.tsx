import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/common/FormComponent";
import { IoIosArrowBack } from "react-icons/io";

interface MetaData {
  [key: string]: any;
}

interface CardFormData {
  card_type: string;
  card_brand: string;
  card_currency: string;
  pin: string;
  meta_data: MetaData;
}

const initialState: CardFormData = {
  card_type: "",
  card_brand: "",
  card_currency: "",
  pin: "",
  meta_data: {},
};

const Card = () => {
  const [formData, setFormData] = useState<CardFormData>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//   console.log(formData);

  return (
    <main className="bg-black flex-col gap-3 pb-[5rem] text-white overflow-y-scroll min-h-screen w-screen between px-3 py-5">
      <div className="flex-col flex w-full gap-6">
        <div className="w-full between border-b pb-3 border-gray-700">
          <Link to="/wallet" className="center gap-2">
            <IoIosArrowBack color="#fff" size={15} />
            <p className="text-sm font-light">Back</p>
          </Link>
          <div className="capitalize font-light text-sm text-center">
            Create card
          </div>
        </div>
        <div className="center flex-col gap-3 w-full">
          <Input
            onChange={handleChange}
            value={formData.card_type}
            type="text"
            label="Card Type"
            placeholder="Virtual"
            name="card_type"
          />

          <Input
            onChange={handleChange}
            value={formData.card_brand}
            type="text"
            label="Card Brand"
            placeholder="Mastercard"
            name="card_brand"
          />

          <Input
            onChange={handleChange}
            value={formData.card_currency}
            type="text"
            label="Card Currency"
            placeholder="NGN"
            name="card_currency"
          />

          <Input
            onChange={handleChange}
            value={formData.pin}
            type="password"
            label="PIN"
            placeholder="****"
            name="pin"
          />
        </div>
      </div>

      <Link
        to="/wallet"
        className="center w-full mt-[3rem] bg-white text-black p-3 rounded-lg font-semibold"
      >
        Submit
      </Link>
    </main>
  );
};

export default Card;
