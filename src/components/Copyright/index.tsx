import type { FC } from 'react'
import './index.css'

const name = 'Jana Chaloupkov√°'
const currentYear = new Date().getFullYear()

export const Copyright: FC = () =>
  <p className="copyright">&#169; 2021 - {currentYear} {name}</p>

