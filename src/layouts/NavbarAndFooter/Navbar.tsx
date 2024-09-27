import { NavLink } from "react-router-dom"

export const Navbar = () => {
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
        </ul>
        {/* ms-auto: automatically set the margin from the left side and align with the right side */}
        <ul className='navbar-nav ms-auto'>
          <li className='nav-item m-1'>
            <a type='button' className='btn btn-outline-light' href='#'>Sign in</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    )
}