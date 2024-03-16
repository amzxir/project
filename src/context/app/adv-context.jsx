import { createContext, useContext, useState } from "react";

const AdvContext = createContext();


const AdvProvider = ({ children }) => {
    const [category, setCategory] = useState();

    return (
        <AdvContext.Provider value={{ category, setCategory }}>
            {children}
        </AdvContext.Provider>
    )
}

const useAdvContext = () => {
    return useContext(AdvContext);
}

export { AdvProvider, useAdvContext };