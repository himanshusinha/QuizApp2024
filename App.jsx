import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RoutesNavigation from './src/navigation/RoutesNavigation';
import SplashScreen from './src/screens/splash/SplashScreen'; // Import SplashScreen here

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Simulate some loading time, replace setTimeout with your actual loading logic
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <NavigationContainer>
      {loading ? (
        <SplashScreen />
      ) : (
        <RoutesNavigation user={user} setUser={setUser} />
      )}
    </NavigationContainer>
  );
};

export default App;
