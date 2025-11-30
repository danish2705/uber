import { createContext, useState } from "react";
export const CaptainDataContext = createContext();

function CaptainContext({ children }) {
  const [captain, setCaptain] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  return (
    <div>
      <CaptainDataContext.Provider value={{ captain, setCaptain }}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
}

export default CaptainContext;
