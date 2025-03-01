import React, { useState,useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";

import TopLayout from "../../layout/toppage/TopLayout";

const classPrices = {
  "Executive Class": 600,
  "Sleeper Class": 800,
  "Business Class": 800,
  "Room/Cabin Class": 4000,
  "Cambay Lounge": 1400,
};

const categoryPrices = {
  Car: 1200,
  Bike: 200,
  Passenger: 0,
  Truck: 2500,
};

const FerrySelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ferry = location.state?.ferry || {};
  const [selectedClass, setSelectedClass] = useState("Executive Class");
  const [passengers, setPassengers] = useState(1);
  const [infants, setInfants] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const baseFare = classPrices[selectedClass];
  const categoryFare = selectedCategory ? categoryPrices[selectedCategory] : 0;
  const totalAmount = passengers * baseFare + categoryFare;

  useEffect(() => {
    if (!location.state) {
      navigate("/ticket", { replace: true });
    }
  }, [location.state, navigate]);
  return (
    <div className="w-full space-y-6 pb-16">
      <TopLayout
        bgimg="https://videos.pexels.com/video-files/3994031/3994031-uhd_2560_1440_30fps.mp4"
        title="Ferry Selection"
      />

      <div className="p-6 bg-white shadow-lg rounded-lg max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {/* <h2 className="text-lg font-semibold">HAZIRA ➝ GHOGHA Wed, 12 Mar</h2> */}
          <h2 className="text-lg font-semibold">
        {ferry.from} ➤ {ferry.to} {ferry.departureTime || "Select Date"}
      </h2>
          <label className="block font-medium">Select Category</label>
          <div className="flex gap-4 mt-2">
            <button
              className={`p-3 rounded-lg ${
                selectedCategory === "Car"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("Car")}
            >
              🚗
            </button>
            <button
              className={`p-3 rounded-lg ${
                selectedCategory === "Bike"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("Bike")}
            >
              🏍️
            </button>
            <button
              className={`p-3 rounded-lg ${
                selectedCategory === "Passenger"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("Passenger")}
            >
              👤
            </button>
            <button
              className={`p-3 rounded-lg ${
                selectedCategory === "Truck"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("Truck")}
            >
              🚛
            </button>
          </div>

          <label className="block font-medium mt-4">Choose Travel Class</label>
          <div className="flex items-center gap-2 mt-2 overflow-x-auto">
            {Object.keys(classPrices).map((item) => (
              <button
                key={item}
                className={`px-4 py-2 rounded-lg ${
                  selectedClass === item
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedClass(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Passengers</label>
            <div className="flex gap-2 mt-2">
              {[...Array(9)].map((_, index) => (
                <button
                  key={index}
                  className={`p-2 w-10 text-center rounded-lg ${
                    passengers === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setPassengers(index + 1)}
                >
                  👤 {index + 1}
                </button>
              ))}
            </div>
            <p className="text-blue-500 mt-2">₹ {baseFare} Per Seat ℹ️</p>
            <p
              className="text-blue-600 underline cursor-pointer mt-2"
              onClick={() => setShowModal(true)}
            >
              Adults more than 9? Click here
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">
              Infants (0-2 YEARS)
            </label>
            <input
              type="number"
              min="0"
              max="9"
              value={infants}
              onChange={(e) => setInfants(Number(e.target.value))}
              className="mt-2 p-2 border rounded w-20"
            />
            <p className="text-blue-500 mt-2">₹ 0 Per Seat ℹ️</p>
            <label className="block text-sm font-medium mt-2">
              Infants should be accompanied by at least one adult
            </label>
          </div>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg w-full md:w-1/3">
          <h3 className="font-semibold text-lg">Booking Summary</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Base Fare:</span> <span>₹{baseFare}</span>
            </p>
            <p className="flex justify-between">
              <span>
                Passenger x {passengers} (₹{passengers * baseFare})
              </span>{" "}
              <span>₹{passengers * baseFare}</span>
            </p>
            <p className="flex justify-between">
              <span>Infant x {infants} (₹0)</span> <span>₹0</span>
            </p>
            {selectedCategory && (
              <p className="flex justify-between">
                <span>{selectedCategory} Charge:</span>{" "}
                <span>₹{categoryFare}</span>
              </p>
            )}
            <p className="font-bold flex justify-between">
              <span>Total Amount:</span> <span>₹{totalAmount}</span>
            </p>
          </div>

          <div className="mt-6 flex justify-between">
            <button className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            {/* <button className="px-4 py-2 bg-blue-500 text-white rounded">BOOK NOW</button> */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() =>
                navigate("/passenger-details", {
                  state: {
                    ferry,
                    selectedClass,
                    passengers,
                    infants,
                    selectedCategory,
                    totalAmount,
                  },
                })
              }
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FerrySelection;
