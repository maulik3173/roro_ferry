import React, { useState } from "react";
import { motion } from "framer-motion";
import { TbArrowsExchange } from "react-icons/tb";

const Search = ({ onSearch }) => {
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState("");
  const locations = ["GHOGHA", "HAJIRA", "MUMBAI", "ALIGADH"];

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  // ✅ Fixed handleSearch function (removed duplicate)
  const handleSearch = () => {
    if (from && to) {
      onSearch(from, to); // Pass the selected locations to Ticket.js
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -900 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -800 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="w-full bg-white shadow-lg p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5"
    >
      {/* Trip Type Selection */}
      <div className="flex flex-col items-start gap-2 text-sm md:text-lg font-medium">
        <label className="flex items-center gap-2 cursor-pointer text-blue-500 font-bold">
          <input
            type="radio"
            name="tripType"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
          />{" "}
          One way
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-gray-500">
          <input
            type="radio"
            name="tripType"
            checked={tripType === "round"}
            onChange={() => setTripType("round")}
          />{" "}
          Round Trip
        </label>
      </div>

      {/* From and To input section */}
      <div className="flex items-center gap-3 md:gap-5 text-center">
        <div className="flex flex-col items-center">
          <p className="text-blue-500 text-xs md:text-sm font-bold">FROM</p>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            list="locations"
            className="text-base md:text-2xl font-bold bg-transparent border border-neutral-300 p-2 rounded-lg text-center w-full"
          />
          <datalist id="locations">
            {locations.map((location, index) => (
              <option key={index} value={location} />
            ))}
          </datalist>
          <p className="text-gray-500 text-xs md:text-sm">RORO TERMINAL</p>
        </div>

        <button
          onClick={swapLocations}
          className="bg-blue-100 p-2 rounded-full border border-blue-500"
        >
          <TbArrowsExchange className="text-blue-500 text-lg md:text-2xl" />
        </button>

        <div className="flex flex-col items-center">
          <p className="text-blue-500 text-xs md:text-sm font-bold">TO</p>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            list="locations"
            className="text-base md:text-2xl font-bold bg-transparent border border-neutral-300 p-2 rounded-lg text-center w-full"
          />
          <p className="text-gray-500 text-xs md:text-sm">RORO TERMINAL</p>
        </div>
      </div>

      {/* Date Pickers */}
      <div className="flex flex-col items-center">
        <p className="text-blue-500 text-xs md:text-sm font-bold">DEPARTURE</p>

        <input
          type="date"
          className="bg-transparent text-sm md:text-xl border border-neutral-300 p-2 rounded-lg text-center w-full"
          value={departureDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>

      {tripType === "round" ? (
        <div className="flex flex-col items-center">
          <p className="text-blue-500 text-xs md:text-sm font-bold">RETURN</p>
          <input
            type="date"
            className="bg-transparent text-sm md:text-xl border border-neutral-300 p-2 rounded-lg text-center w-full"
            value={returnDate}
            min={new Date(new Date().setDate(new Date().getDate() + 1))
              .toISOString()
              .split("T")[0]}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
      ) : (
        <div className="text-gray-400 flex flex-col items-center">
          <p className="text-xs md:text-sm font-bold">RETURN</p>
          <p className="text-xs md:text-sm">
            Tap Round trip to add a return date.
          </p>
        </div>
      )}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="text-xl w-32 h-12 rounded-xl bg-blue-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
      >
        SEARCH
      </button>
    </motion.div>
  );
};

export default Search;
