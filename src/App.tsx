import React from 'react';

import './App.css';
import Content from './components/content/Content';
import MenuPage from './components/MenuPage/MenuPage';

const App: React.FC = () => {
  return (

    <div className="App">
      <div className="container">
        <div className="wrapper">
          <MenuPage />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;
