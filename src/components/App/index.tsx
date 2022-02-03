import { FC } from 'react';

import './index.css';
import Calculator from '../Calculator';
import Footer from '../Footer';
import StarryNight from '../StarryNight';
import Header from '../Header';

const App: FC = () => (
  <div className="page-wrapper">
    <StarryNight />
    <Header />
    <main>
      <Calculator />
    </main>
    <Footer />
  </div>
)

export default App;
