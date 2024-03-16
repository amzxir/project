import { createContext, useContext, useState } from "react";

const AdvContext = createContext();


const AdvProvider = ({ children }) => {
    const [adv, setAdv] = useState();

    return (
        <AdvContext.Provider value={{ adv, setAdv }}>
            {children}
        </AdvContext.Provider>
    )
}

const useAdvContext = () => {
    return useContext(AdvContext);
}

export { AdvProvider, useAdvContext };