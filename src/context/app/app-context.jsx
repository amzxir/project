import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./app-reducer";

const AppContext = createContext();

const initialState = {
    theme: localStorage.getItem("theme") || 'light',
}

const AppProvider = ({ children }) => {

    const [state , dispatch] = useReducer(appReducer , initialState)

    const chnageTheme = (theme) => {
        dispatch({ type: "CHANGE_THEME", payload: theme })
    }

    useEffect(() => {
        localStorage.setItem("theme", state.theme)
    },[state.theme])

    return (
        <AppContext.Provider value={{ ...state , chnageTheme }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useAppContext }