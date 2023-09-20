import React, { useEffect, useState } from 'react';
import firebase from '../config/firebaseConfig.js';
import './components.css';
import Navbar from './Navbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EMGMonitoring = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Generate random data for EMG and Servo every second
    const intervalId = setInterval(() => {
      setData(prevData => {
        const newData = [
          ...prevData,
          {
            timestamp: new Date().getTime(),
            Elektromiogram: Math.floor(Math.random() * 100), // Random EMG value between 0 and 100
            Servo: Math.floor(Math.random() * 100) // Random Servo value between 0 and 100
          }
        ];

        // Keep only the last 10 data points
        return newData.slice(-100);
      });
    }, 1000); // Change data every second

    return () => {
      clearInterval(intervalId); // Clear the interval when component is unmounted
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <div className="flex justify-center"> 
      {/* Konten utama */}
      <div className="p-6">
        <h1 className="text-2xl mb-4 font-montserrat">X-Manibus Monitoring Page</h1>

        {/* Line Chart */}
        <LineChart
          width={1200}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip labelFormatter={(value) => new Date(value).toLocaleTimeString()} />
          <Legend />
          <Line type="monotone" dataKey="Elektromiogram" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Servo" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
    </div>  
  );
};

export default EMGMonitoring;
