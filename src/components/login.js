import React, { useEffect } from "react"; // Import useEffect from React
import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import "../App.css";
import "./components.css";
import "../config/firebaseConfig"; // Ubah impor ke file konfigurasi Firebase

// Import gambar dari direktori images
import homepageImage from "../images/homepage.png";

// Import Firebase dan fungsi auth
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Login = () => {
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    // Cek apakah pengguna sudah login sebelumnya
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Pengguna sudah login, arahkan ke halaman dashboard
        history.push("/dashboard");
      }
    });

    // Unsubscribe dari listener saat komponen unmount
    return () => unsubscribe();
  }, [history]);

  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("Login successful:", result);
        // Redirect to Navbar on successful login
        window.location.href = "/dashboard"; // Ganti dengan URL navbar yang sesuai
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-500 text-white font-montserrat">
      <div className="mt-12 mb-4 text-center">
        <img
          src={homepageImage}
          alt="Kid with rain gear"
          className="w-40 h-auto mx-auto rounded-full"
        />
        <h1 className="text-4xl font-bold mb-4">
          X-Manibus: Monitoring Realtime Pasien Pasca Stroke
        </h1>
        <p className="text-lg">
          Program Matching Fund yang membantu evaluasi keberhasilan terapi pada
          pasien pasca stroke melalui pemantauan realtime.
        </p>
      </div>
      {/* Logo "Login with Google" menggunakan Font Awesome */}
      <p>Masuk dengan</p>
      <div
        className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-bounce mt-8"
        onClick={handleGoogleLogin}
      >
        <i className="fa fa-google text-white"></i>
      </div>
    </div>
  );
};

export default Login;
