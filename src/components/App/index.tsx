import type { FC } from 'react'

import './index.css'
import Calculator from '../Calculator'
import Footer from '../Footer'
import Header from '../Header'
import StarryNight from '../StarryNight'

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

export default App
