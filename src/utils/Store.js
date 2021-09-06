import { createContext, useReducer, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { auth } from "../components/Chatroom/firebase";
import { useHistory } from "react-router-dom";
export const Store = createContext();
 

const initialState = {
  user: Cookies.get('user')?JSON.parse(Cookies.get('user')):null
  
};

export function removeUser(string){
   Cookies.remove(string)
}
function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const history = useHistory()
  const [user, setUser] = useState()
  const [loading, setLoading]= useState(true)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
      //console.log(user.displayName)
      setLoading(false)
      // if(user){
      //   history.push('/chats')
      //   }     
    })
   // history.replace('/chats')
  }, [user, history])
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch, user };
  return <Store.Provider value={value}>{!loading && props.children}</Store.Provider>;
}
