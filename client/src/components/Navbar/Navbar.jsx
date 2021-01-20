import React from 'react'
import { Link } from 'react-router-dom'
import { RightMenu } from './Sections'

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">
            <h1>효선이네 햄버거</h1>
          </Link>
        </li>
      </ul>
      <RightMenu />
    </nav>
  )
}
