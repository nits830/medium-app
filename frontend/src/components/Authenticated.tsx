import React from 'react'
import { Link } from 'react-router-dom'

const Authenticated = () => {
  return (
    <div className="">
          <ul className="flex gap-5 justify-center items-center p-5 text-xl">
            <li><Link to="/write">Write</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li className='border border-black rounded-lg p-3 bg-black text-white hover:bg-white hover:text-black'><Link to="/">Logout</Link></li>
            
          </ul>
        </div>
  )
}

export default Authenticated