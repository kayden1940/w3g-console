import * as React from "react";
import axios from "axios";
import { useStore } from "../store";
import shallow from "zustand/shallow";

// https://ui.dev/react-router-protected-routes-authentication/

const useAuth = () => {
  const { setAuthed, setLoading, setMe } = useStore(
    (state) => ({
      // ...state,
      setAuthed: state.setAuthed,
      setLoading: state.setLoading,
      setMe: state.setMe,
    }),
    shallow
  );
  return {
    async login({ email, password }) {
      try {
        setLoading(true);
        const result = await axios.post(
          `${process.env.REACT_APP_API_ROOT_URL}/operators/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        setLoading(false);
        if (result?.data?.status === "success") {
          setAuthed(true);
          setMe(result.data.data.operator);
          return true;
        }
      } catch (error) {
        setLoading(false);
        setAuthed(false);
        console.log("Caught: " + error);
        return false;
      }
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
};

export default useAuth;
