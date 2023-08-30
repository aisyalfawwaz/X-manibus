import React, { useState, useEffect } from "react";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Initialize Firebase with your configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOof95awYRY2PrDP8H8B027jJXkR32tXY",
  authDomain: "x-manibus.firebaseapp.com",
  projectId: "x-manibus",
  storageBucket: "x-manibus.appspot.com",
  messagingSenderId: "693248919281",
  appId: "1:693248919281:web:3617e69253c59497604b50",
  measurementId: "G-DXXHGH5364",
};

firebase.initializeApp(firebaseConfig);

function generateRandomECGValue() {
  return Math.random() * 200 - 100;
}

function generateRandomEMGValue() {
  return Math.random() * 200 - 100;
}

function App() {
  const [ecgData, setECGData] = useState({});
  const [emgData, setEMGData] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setUserProfilePic(authUser.photoURL);

        const initialData = {};
        for (let i = 0; i < 10; i++) {
          const timestamp = new Date().toISOString();
          initialData[timestamp] = generateRandomECGValue();
        }
        setECGData(initialData);

        const initialDataEmg = {};
        for (let i = 0; i < 10; i++) {
          const timestamp = new Date().toISOString();
          initialDataEmg[timestamp] = generateRandomEMGValue();
        }
        setEMGData(initialDataEmg);

        const updateDataInterval = setInterval(() => {
          const timestamp = new Date().toISOString();

          setEMGData((prevData) => ({
            ...prevData,
            [timestamp]: generateRandomEMGValue(),
          }));

          setECGData((prevData) => ({
            ...prevData,
            [timestamp]: generateRandomECGValue(),
          }));
        }, 1000);

        return () => {
          clearInterval(updateDataInterval);
        };
      } else {
        setUser(null);
        setECGData({});
        setEMGData({});
        setUserProfilePic(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const chartTitleStyle = {
    fontFamily: "Times New Roman", // Change this to the desired font family
    fontSize: "18px", // Change this to the desired font size
    fontWeight: "bold", // Change this to the desired font weight
  };

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      <header className="App-header">
        <div className="profile-icon">
          {user && userProfilePic && <img src={userProfilePic} alt="Profile" />}
        </div>
        <h1>X-Manibus Realtime Monitoring</h1>
        {user ? (
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="button login-button" onClick={handleLogin}>
            Login with Google
          </button>
        )}
        <button className="button" onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      {user ? (
        <main className="App-main">
          <div className="chart-container">
            <div className="chart">
              <LineChart
                data={ecgData}
                library={{
                  colors: ["#b00", "#666"],
                  title: { style: chartTitleStyle },
                }}
                ytitle="Signal"
                legend={false}
              />
            </div>
            <div className="chart">
              {/* Add your second chart here */}
              <LineChart data={emgData} ytitle="Servo" legend={false} />
            </div>
          </div>
        </main>
      ) : (
        <div className="login-message">Please login to view the chart.</div>
      )}
      <footer className="App-footer">
        <p>Copyright by Aisy Al Fawwaz</p>
      </footer>
    </div>
  );
}

export default App;
