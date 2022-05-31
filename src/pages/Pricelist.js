import React from "react";
import { FaCheck } from "react-icons/fa";

const data = [
  {
    judul: "FEED",
    price: "60",
    description: ["max 10 slide"],
  },
  {
    judul: "IG STORY",
    price: "20",
    description: [
      "foto / video (max 15 detik)",
      "Link tautan",
      "Konten & caption dari client",
    ],
  },
  {
    judul: "Giveaway Mandiri",
    price: "100",
    description: [
      "Giveaway hanya 1 brand/username",
      "Minimal 3 hadiah",
      //  "Link tautan",
    ],
  },
  {
    judul: "Giveaway Collabs",
    price: "60",
    description: [
      "Price diatas per brand/username",
      "Giveaway digabung dengan brand lain",
      //  "Konten & caption dari client",
    ],
  },
  {
    judul: "IG Reels",
    price: "100",
    description: [
      "Keep 3 bulan (90 hari)",
      "Content dan caption dari client",
      //  "Konten & caption dari client",
    ],
  },
  {
    judul: "Paket Hemat",
    subJudul: "(2x Feed + 2x Story)",
    price: "100",
    description: [
      "Keep 3 bulan (90 hari)",
      "Content dan caption dari client",
      //  "Konten & caption dari client",
    ],
    favorite: true,
  },
];

const Pricelist = () => {
  return (
    <div className="p-5">
      <h1 className="text-5xl font-bold text-center mb-5">Pricelist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data.map((item) => (
          <div
            key={item.judul}
            className="shadow-lg shadow-gray-400 border-[1px] border-gray-300 rounded-2xl flex flex-col items-center justify-center p-5 gap-5"
          >
            <h2 className="text-3xl font-bold text-center">{item.judul}</h2>
            {item.subJudul && (
              <h2 className="text-2xl text-center">{item.subJudul}</h2>
            )}
            <h2 className="text-5xl font-bold text-blue-500">
              {item.price}
              <span className="text-3xl">k</span>
            </h2>
            <div className="sm:max-w-[80%]">
              {item.description.map((val, i) => (
                <div key={i} className="flex gap-2 text-gray-500 items-start">
                  <div className="pt-1">
                    <FaCheck size="1rem" />
                  </div>
                  <p>{val}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricelist;
