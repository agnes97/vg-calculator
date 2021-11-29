import React from 'react';

import './index.css';
import Calculator from '../Calculator';
import Footer from '../Footer';
import Header from '../Header';

const App: React.FC = () => (
  <div className="page-wrapper">
    <Header />
    <main>
      <Calculator />
    </main>
    <Footer />
  </div>
)

export default App;
