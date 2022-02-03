import { FC } from 'react'
import './index.css'

const name = "Jana Chaloupková"
const currentYear = new Date().getFullYear()

const Copyright: FC = () => <p className="copyright">&#169; 2021 - {currentYear} {name}</p>

export default Copyright