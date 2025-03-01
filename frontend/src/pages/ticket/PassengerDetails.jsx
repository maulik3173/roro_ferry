import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaCar, FaPhone } from "react-icons/fa";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    passengers = 1,
    selectedClass = "Executive Class",
    selectedCategory = "Passenger",
    totalAmount = 0,
    ferry = { from: "", to: "", departureTime: "Select Date" }, // Default ferry data
  } = location.state || {}; // Extract data safely

  const [contactNumber, setContactNumber] = useState("");
  const [proofType, setProofType] = useState("Aadhaar");
  const [proofNumber, setProofNumber] = useState("");

  // Redirect if state is missing
  useEffect(() => {
    if (!location.state) {
      navigate("/ticket", { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <div className="flex gap-6 p-6 bg-gray-100">
      {/* Left Side - Form Sections */}
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Passengers Details</h2>
        <div className="text-gray-700 text-lg font-semibold">
          {ferry?.from} ➤ {ferry?.to}
        </div>
        <p className="text-sm text-gray-500">
          Departure: {ferry?.departureTime}
        </p>

        {/* Passenger Details */}
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="text-lg font-semibold">Passenger(s)</h3>
          <p className="text-blue-600 text-sm font-semibold">
            Enter your name as per government-approved ID.
          </p>

          {/* Generate Passenger Forms */}
          {Array.from({ length: passengers }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-2 items-center mt-4 bg-gray-100 p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-600 text-lg" />
                <span className="bg-gray-200 px-3 py-2 rounded-md text-sm">
                  Passenger {index + 1}
                </span>
              </div>
              <input
                type="text"
                placeholder="First Name"
                className="border p-2 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-2 rounded-md text-sm"
              />
              <select className="border p-2 rounded-md text-sm">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <input
                type="number"
                placeholder="Age"
                className="border p-2 rounded-md text-sm w-16"
              />
              <input
                type="text"
                value={selectedClass}
                className="border p-2 rounded-md text-sm bg-gray-200"
                readOnly
              />
            </div>
          ))}
        </div>

        {/* Vehicle Section */}
        {selectedCategory !== "Passenger" && (
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="text-lg font-semibold">Vehicle(s)</h3>
            <span className="text-blue-600 text-sm font-semibold">
              Important:{" "}
              <span className="text-gray-600">
                Enter vehicle details as per government-approved ID.
              </span>
            </span>

            <div className="grid grid-cols-4 bg-gray-100 p-2 mt-3 text-sm font-semibold text-gray-700">
              <span>Vehicle Type</span> <span>Vehicle Name</span>{" "}
              <span>Vehicle Number</span> <span>Weight</span>
            </div>

            <div className="grid grid-cols-4 gap-2 items-center mt-2">
              <div className="flex items-center gap-2">
                <FaCar className="text-gray-600 text-lg" />
                <span className="bg-gray-200 px-3 py-2 rounded-md text-sm">
                  Car
                </span>
              </div>

              <input
                type="text"
                placeholder="Vehicle Name (ex: Honda)"
                className="border p-2 rounded-md text-sm w-full"
              />
              <input
                type="text"
                placeholder="Hint: AA00BB1234"
                className="border p-2 rounded-md text-sm w-full"
              />
              <input
                type="number"
                placeholder="0"
                className="border p-2 rounded-md text-sm w-16"
              />

              <label className="flex items-center gap-2 col-span-4 mt-2">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-sm text-gray-700">New Vehicle?</span>
              </label>
            </div>
          </div>
        )}

        {/* Proof Details */}
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="text-lg font-semibold">Proof Detail(s)</h3>
          <span className="text-blue-600 text-sm font-semibold">
            Important:{" "}
            <span className="text-gray-600">
              Enter details as per government-approved.
            </span>
          </span>

          <div className="grid grid-cols-2 gap-2 items-center mt-3">
            <select
              className="border p-2 rounded-md text-sm"
              value={proofType}
              onChange={(e) => {
                setProofType(e.target.value);
                setProofNumber(""); // Reset the input when type changes
              }}
            >
              <option value="Aadhaar">Aadhaar</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
            </select>

            <input
              type="text"
              placeholder={
                proofType === "Passport"
                  ? "Enter Passport Number"
                  : proofType === "Driving License"
                  ? "Enter License Number"
                  : "Enter Aadhaar Number"
              }
              className="border p-2 rounded-md text-sm"
              value={proofNumber}
              onChange={(e) => setProofNumber(e.target.value)}
              pattern={
                proofType === "Aadhaar"
                  ? "\\d{12}"
                  : proofType === "Passport"
                  ? "[A-Z]{1}[0-9]{7}"
                  : proofType === "Driving License"
                  ? "[A-Z0-9]+"
                  : ".*"
              }
              title={
                proofType === "Aadhaar"
                  ? "Aadhaar must be a 12-digit number"
                  : proofType === "Passport"
                  ? "Passport must start with a letter followed by 7 digits"
                  : proofType === "Driving License"
                  ? "Enter a valid license number"
                  : ""
              }
              required
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="text-lg font-semibold">Contact Detail(s)</h3>
          <span className="text-blue-600 text-sm font-semibold">
            Important:{" "}
            <span className="text-gray-600">
              Booking transaction-related notifications will be sent to this
              number.
            </span>
          </span>

          <div className="flex items-center gap-2 mt-3">
            <FaPhone className="text-gray-600 text-lg" />
            <input
              type="text"
              placeholder="Enter Contact No"
              className="border p-2 rounded-md text-sm w-full"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Right Side - Fare Summary */}
      <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Fare Summary</h3>

        <div className="border-t mt-3 pt-3">
          <p className="text-md font-semibold">Departure:</p>
          <div className="flex justify-between text-gray-700 text-sm mt-2">
            <span>Base Fare</span>{" "}
            <span className="font-semibold">₹{totalAmount}</span>
          </div>
          <div className="flex justify-between text-gray-700 text-sm">
            <span>Other Services</span>{" "}
            <span className="font-semibold">₹0.00</span>
          </div>
          <div className="flex justify-between font-semibold text-md mt-2">
            <span>Sub Total:</span>{" "}
            <span className="text-red-500">₹{totalAmount}</span>
          </div>
        </div>

        <button className="w-full bg-orange-500 text-white text-lg font-semibold py-2 mt-4 rounded-md">
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
