import React, {useState} from 'react';
import RoutesNavigation from './src/navigation/RoutesNavigation';

const App = () => {
  const [user, setUser] = useState(null);

  return <RoutesNavigation user={user} setUser={setUser} />;
};

export default App;
