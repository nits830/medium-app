import { Link } from 'react-router-dom';
import Authenticated from './Authenticated';
import NotAuthenticated from './NotAuthenticated';




const Header = () => {

    const isAuthenticated = false
  return (
    <>
      <div className="h-20 font-sans flex justify-between">
        <Link to="/">
        <div className="text-2xl font-bold flex justify-center items-center float-start">
          <img src="https://t4.ftcdn.net/jpg/05/30/22/25/360_F_530222536_UXrSnRK1dKUkcti6oXPW1GoFFMAZ4FHY.jpg" alt="logo" className="h-16 w-16" />
          <h1>Latency</h1>
        </div>
        </Link>

        {/* Search bar */}
        <div className="relative flex items-center w-96 gap-2">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
            placeholder="Search..."
          />
          <button className=" inset-y-0 right-0 px-3 py-2 border border-black bg-black text-white rounded-md hover:bg-white hover:text-black"
          
          >
            Search
          </button>
          
        </div>

        {isAuthenticated ? <Authenticated/> : <NotAuthenticated/>}
        
        
      </div>
    </>
  );
}

export default Header;
