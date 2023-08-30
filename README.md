# X-Manibus Realtime Monitoring

X-Manibus Realtime Monitoring is a web application that displays real-time data from sensors in the form of interactive line charts. The application is built using React and integrates Firebase for authentication and data storage.

## Features

- Real-time monitoring of sensor data with interactive line charts.
- Support for multiple data streams (ECG and EMG in this case).
- Dark and light mode for user interface customization.
- User authentication using Google login.
- Simple and intuitive UI design.

## Getting Started

To run the X-Manibus Realtime Monitoring application on your local machine, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/x-manibus-realtime-monitoring.git
   cd x-manibus-realtime-monitoring
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Create a Firebase project and obtain the configuration details (apiKey, authDomain, etc.). Replace the placeholders in `src/App.js` with your Firebase configuration.

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Firebase: A platform for building web and mobile applications.
- React Chartkick: A React wrapper for Chartkick, a charting library based on Chart.js.

## Acknowledgements

This project was developed by [Aisy Al Fawwaz](https://github.com/aisyalfawwaz). It serves as an example of real-time data visualization using React and Firebase. Feel free to modify and extend it for your own projects.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For any questions or inquiries, please contact [Aisy Al Fawwaz](https://github.com/aisyalfawwaz).
