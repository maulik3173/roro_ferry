import React, { useState } from "react";
import TopLayout from "../../layout/toppage/TopLayout";
import RootLayout from "../../layout/RootLayout";
import { motion } from "framer-motion";
import Search from "../home/hero/search/Search";
import FerryCard from "./FerryCard"; // ✅ Import FerryCard Component

// ✅ Move dummyFerries above useState
const dummyFerries = [
  {
    id: 1,
    name: "Sworgadwari Deluxe",
    departureTime: "06:15 PM",
    arrivalTime: "08:45 AM",
    from: "Mumbai",
    to: "alibag",
    price: 600,
    availableSeats: 5,
    totalSeats: 35,
  },
  {
    id: 2,
    name: "Ocean Queen",
    departureTime: "10:00 AM",
    arrivalTime: "02:00 PM",
    from: "Hazira",
    to: "Ghogha",
    price: 600,
    availableSeats: 8,
    totalSeats: 40,
  },
  {
    id: 3,
    name: "Sea Explorer",
    departureTime: "12:00 PM",
    arrivalTime: "04:00 PM",
    from: "Ghogha",
    to: "Dahej",
    price: 1400,
    availableSeats: 10,
    totalSeats: 45,
  },
];

const Ticket = () => {
  // ✅ Now dummyFerries is defined before useState
  const [ferries, setFerries] = useState(dummyFerries);

  // Handle search based on selected route
  // const handleSearch = (from, to) => {
  //   if (from && to) {
  //     const filteredFerries = dummyFerries.filter(
  //       (ferry) =>
  //         ferry.from.toLowerCase() === from.toLowerCase() &&
  //         ferry.to.toLowerCase() === to.toLowerCase()
  //     );
  //     setFerries(filteredFerries);
  //   } else {
  //     setFerries(dummyFerries);
  //   }
  // };

  const handleSearch = (from, to) => {
    if (from && to) {
      const filteredFerries = dummyFerries.filter(
        (ferry) =>
          ferry.from.toLowerCase() === from.toLowerCase() &&
          ferry.to.toLowerCase() === to.toLowerCase()
      );
      setFerries(filteredFerries);
    } else {
      setFerries(dummyFerries);
    }
  };
  return (
    <div className="w-full space-y-12 pb-16">
      <TopLayout
        bgimg="https://videos.pexels.com/video-files/3994031/3994031-uhd_2560_1440_30fps.mp4"
        title="Reserve Your Ticket"
      />

      <RootLayout className="space-y-12 relative">
        <div className="space-y-5 w-full bg-neutral-50 flex py-4 items-center justify-center flex-col sticky top-0 z-30">
          <motion.h1
            initial={{ opacity: 0, y: -900 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -800 }}
            transition={{ duration: 1.35, ease: "easeOut" }}
            className="text-3xl text-neutral-700 font-semibold"
          >
            Want to change the route?
          </motion.h1>
          <Search onSearch={handleSearch} />
        </div>

        {/* 🚢 Display Ferry Cards */}
        <div className="flex flex-col gap-6 w-full">
          {ferries.length > 0 ? (
            ferries.map((ferry) => <FerryCard key={ferry.id} ferry={ferry} />)
          ) : (
            <p className="text-center text-gray-500 text-lg">No ferries available</p>
          )}
        </div>
      </RootLayout>
    </div>
  );
};

export default Ticket;
