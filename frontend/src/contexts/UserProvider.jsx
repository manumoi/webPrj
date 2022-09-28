import React, { createContext, useContext, useState } from "react";

const UserContext = createContext()
const UserUpdateContext = createContext()

export const useUser= ()=>{         // exported custom hook to access the state value associated to UserContext
    return useContext(UserContext)
}

export const useUserUpdate =()=>{  // exported custom hook to access the state modifier function associated to UserUpdateContext
    return useContext(UserUpdateContext)
}


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const userUpdate = (user) => {
        setUser(user)
    }

    return (
        <>
            <UserContext.Provider value={user}>                     {/* associating the user value to the UserContext provider*/}
                <UserUpdateContext.Provider value={userUpdate}>     {/* associating the userUpdate function to the UserUpdateContext provider*/}
                    {children}
                </UserUpdateContext.Provider>
            </UserContext.Provider>
        </>
    )

}



