import type { FC } from 'react'

import './index.css'
import { Star } from './Star'

export const StarryNight: FC = () => (
  <div className="starry-night">
    <Star />
    <Star />
    <Star />
    <Star />
    <Star />
  </div>
)
