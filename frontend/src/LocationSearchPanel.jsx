function LocationSearchPanel({ setVehiclePanel, setPanelOpen }) {
  const locations = [
    "24b, nears kapoor cafe, sheriyans coding school, bhopal",
    "24b, nears kapoor cafe, sheriyans coding school, bhopal",
    "24b, nears kapoor cafe, sheriyans coding school, bhopal",
    "24b, nears kapoor cafe, sheriyans coding school, bhopal",
  ];
  return (
    <div>
      {locations.map((item) => (
        <div
          onClick={() => {
            setVehiclePanel(true);
            setPanelOpen(false);
          }}
          key={item}
          className="flex items-center border-2 p-3 my-4 border-gray-100 hover:border-black mx-2 justify-start rounded-xl pb-2"
        >
          <h2 className="bg=[#eee] h-10 w-10 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{item}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
