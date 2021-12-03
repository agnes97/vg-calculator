import React from 'react';

import './index.css';
import Calculator from '../Calculator';
import Footer from '../Footer';
import Header from '../Header';
import StarryNight from '../StarryNight';

const App: React.FC = () => (
  <div className="page-wrapper">
    <Header />
    <StarryNight />
    <main>
      <Calculator />
    </main>
    <Footer />
  </div>
)

export default App;
