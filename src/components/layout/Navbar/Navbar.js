import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars as Hamburger, FaShoppingCart } from 'react-icons/fa' 
import './Navbar.css'
import { useSelector } from 'react-redux'
import { selectCartItemCount } from '../../../redux/cart/cartSlice'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const cartItemCount = useSelector(selectCartItemCount); 


  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="logo-icon">🛒</span> 
          RC Store
        </Link>
      </div>

        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/checkout">
                <FaShoppingCart /> ({cartItemCount}) 
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
