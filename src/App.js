import React, { useState, useEffect } from "react";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database"; // Import the database module

// Initialize Firebase with your configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOof95awYRY2PrDP8H8B027jJXkR32tXY",
  authDomain: "x-manibus.firebaseapp.com",
  projectId: "x-manibus",
  storageBucket: "x-manibus.appspot.com",
  messagingSenderId: "693248919281",
  appId: "1:693248919281:web:3617e69253c59497604b50",
  measurementId: "G-DXXHGH5364",
  databaseURL: "https://x-manibus-default-rtdb.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);

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

        const updateDataInterval = setInterval(() => {
          const timestamp = new Date().toISOString();

          // Get the latest values from the database for ECG and EMG
          firebase
            .database()
            .ref("data")
            .once("value")
            .then((snapshot) => {
              const data = snapshot.val();
              if (data) {
                setECGData((prevData) => ({
                  ...prevData,
                  [timestamp]: data.ecg,
                }));

                setEMGData((prevData) => ({
                  ...prevData,
                  [timestamp]: data.servo,
                }));
              }
            });
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
    fontFamily: "Times New Roman",
    fontSize: "18px",
    fontWeight: "bold",
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
              <LineChart
                data={emgData}
                library={{
                  colors: ["#0b0", "#666"],
                  title: { style: chartTitleStyle },
                }}
                ytitle="Servo"
                legend={false}
              />
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
