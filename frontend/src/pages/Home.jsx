import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../LocationSearchPanel";

function Home() {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  return (
    <div className="relative h-screen overflow-hidden">
      <div onClick={() => setVehiclePanel(false)} className="w-screen h-screen">
        <img
          className="h-full w-full"
          alt="alternate image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABLUH3RR9WY4ogN9jIsbV0QTaQWXDvEWW1A&s"
        ></img>
      </div>
      <div className="h-screen absolute flex flex-col justify-end top-0 w-full">
        <div className="h-[30%] bg-white p-5 relative">
          <h2
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute top-0 right-2 text-xl opacity-0"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h2>
          {/* <h4 className="text-2xl font-semibold">Find a trip</h4> */}
          <form onSubmit={submitHandler}>
            {/* <div className="line h-16 w-0.5 absolute top-[78%] left-8 bg-black rounded-full"></div> */}
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              onClick={() => setPanelOpen(true)}
              value={pickUp}
              onChange={(e) => setPickUp(e.target.value)}
              placeholder="Add a pick up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-[0%] bg-white overflow-hidden">
          <LocationSearchPanel
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bg-white bottom-0 px-3 py-6 w-full translate-y-full"
      >
        <h3 className="text-2xl font-semibold mb-2">Choose a vehicle</h3>
        <div className="flex items-center border-transparent hover:border-gray-900 justify-between border-2 active:border-black bg-gray-100 rounded-xl mb-2">
          <img
            className="h-10 pl-2"
            alt="car"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUvspjWAN2byVrrvOr5p4fexsN9vzG8JTsbQ&s"
          />
          <div className="font-semibold w-1/2">
            <h4 className="font-medum text-sm">
              UberGo
              <span className="ml-2">
                <i className="ri-user-3-fill">4</i>
              </span>
            </h4>
            <h5 className="text-sm font-medium">2 mins away</h5>
            <p className="font-normal text-medium text-sm text-gray-800">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="font-semibold pr-1">$193.20</h2>
        </div>
        <div className="flex border-transparent bg-gray-100 hover:border-gray-900 items-center justify-between border-2 border-black rounded-xl mb-2">
          <img
            className="h-10 pl-2"
            alt="car"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
          />
          <div className="font-semibold w-1/2">
            <h4 className="font-medum text-sm">
              UberAuto
              <span className="ml-2">
                <i className="ri-user-3-fill">3</i>
              </span>
            </h4>
            <h5 className="text-sm font-medium">4 mins away</h5>
            <p className="font-normal text-medium text-sm text-gray-800">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="font-semibold pr-1">$103.70</h2>
        </div>
        <div className="flex bg-gray-100 border-transparent hover:border-gray-900 items-center justify-between border-2 border-black rounded-xl">
          <img
            className="h-10 pl-2"
            alt="bike"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
          />
          <div className="font-semibold w-1/2">
            <h4 className="font-medum text-sm">
              UberBike
              <span className="ml-2">
                <i className="ri-user-3-fill">1</i>
              </span>
            </h4>
            <h5 className="text-sm font-medium">6 mins away</h5>
            <p className="font-normal text-medium text-sm text-gray-800">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="font-semibold pr-1">$93.20</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
508