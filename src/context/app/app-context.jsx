import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./app-reducer";

const AppContext = createContext();

const initialState = {
    theme: localStorage.getItem("theme") || 'light',
    sidebar: false,

}

const AppProvider = ({ children }) => {

    const [state , dispatch] = useReducer(appReducer , initialState)

    const chnageTheme = (theme) => {
        dispatch({ type: "CHANGE_THEME", payload: theme })
    }

    const chnageSidebar = () => {
        dispatch({ type: "CHANGE_SIDEBAR" })
    }

    useEffect(() => {
        localStorage.setItem("theme", state.theme)
    },[state.theme])

    return (
        <AppContext.Provider value={{ ...state , chnageTheme , chnageSidebar}}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useAppContext }