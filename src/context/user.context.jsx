import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

export const UserContext = createContext({ //actual context value, creates a context, returns the values and methods set using setState inside the userprovider
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => { //provider allows us 1 and 2
  const [currentUser, setCurrentUser] = useState(null); //1. allows user to read and set the value of the state 
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) { //if the state of auth changes and user is not null, i.e. the user has logged in
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe; //unsubscribe passed to onAuthStateChangedListener when this component mounts
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>; //2. every context has a provider that wraps around the component and gives context access to any children component that may need it. In our case, we wrapped it around <App /> in index.js. So all its children have access to the said context
};
