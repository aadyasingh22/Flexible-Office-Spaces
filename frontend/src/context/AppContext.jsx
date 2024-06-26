import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({children}) => {

    const navigate = useNavigate();

    const [currentUser, setcurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
    )
    
    const [loggedIn, setLoggedIn] = useState(currentUser !== null);

    const logout = () => {
        setLoggedIn(false);
        sessionStorage.removeItem('user');
        navigate('/main/login')
    };

    return <AppContext.Provider value={{loggedIn, setLoggedIn, logout}}>
        {children}
    </AppContext.Provider>
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;