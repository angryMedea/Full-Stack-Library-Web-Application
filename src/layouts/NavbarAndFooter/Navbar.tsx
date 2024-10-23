import { Link, NavLink } from "react-router-dom"
import { useOktaAuth } from "@okta/okta-react"
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {

    const {oktaAuth, authState} = useOktaAuth();

    if(!authState){
      return <SpinnerLoading/>
    }

    const handleLogout = async () => oktaAuth.signOut()

    console.log(authState)

    return  (
        // py-3:padding-y，adds padding to the top and bottom (vertical) of an element.
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
    <div className='container-fluid'>
      {/* a non-semantic inline container, primarily used for styling 
      a small portion of content or manipulating it with JavaScript */}
      <span className='navbar-brand'>Page Turner</span>
      <button className='navbar-toggler' type='button'
      data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
      // ARIA（Accessible Rich Internet Applications）to tell the screen
      // which element should be controlled
      aria-controls='navbarNavDropdown' aria-expanded='false'
      aria-label='Toggle Navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavDropdown'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/home'>Home</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/search'>Search Books</NavLink>
          </li>
          {authState.isAuthenticated &&
            <li className="nav-item">
              <NavLink className='nav-link' to='/shelf'>Shelf</NavLink>
            </li>
          
          
          }
        </ul>
        {/* ms-auto: automatically set the margin from the left side and align with the right side */}
        <ul className='navbar-nav ms-auto'>
        {!authState.isAuthenticated ?
              <li className='nav-item m-1'>
                <Link type='button' className='btn btn-outline-light' to='/login'>Sign in</Link>
              </li>
              :
              <li>
                <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
              </li>
            }
        </ul>
      </div>
    </div>
  </nav>
    )
}