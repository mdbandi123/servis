import firebase from "firebase/app";
import "firebase/auth";

const Logout = async () => {
  try {
    await firebase.auth().signOut();
    window.location.href = "/";
  } catch (e) {
    console.log(e);
  }
};

export default Logout;
