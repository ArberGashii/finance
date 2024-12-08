import { create } from "zustand";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase/firebase";

const useAuthenticate = create((set) => ({
  currentUser: null,
  handleLogin: async (userData) => {
    set({ currentUser: userData });
  },
  logout: handleLogout,
  loading: false,
}));

useAuthenticate.setState({ loading: true });

const handleAuthStateChanged = async (user) => {
  if (user) {
    const { email, emailVerified, uid, expirationTime } = user;

    const userData = {
      email,
      emailVerified,
      uid,
      expirationTime,
    };

    useAuthenticate.setState({ loading: false });
    useAuthenticate.setState({ currentUser: userData });
  } else {
    useAuthenticate.setState({ loading: false });
    useAuthenticate.setState({ currentUser: null });
  }
};

onAuthStateChanged(firebaseAuth, (user) => handleAuthStateChanged(user));

async function handleLogout() {
  try {
    await signOut(firebaseAuth);
    useAuthenticate.setState({ currentUser: null });
  } catch (error) {
    console.log({ error });
  }
}

export default useAuthenticate;
