export const Footer = () => {
    return (
        <div className="main-color">
            <footer className="container d-flex flex-wrap
            justify-content-between align-items-center py-5 main-color">
                <p className="col-md-4 mb-0 text-white">© Page Turner Library App, Inc</p>
                {/* justify-content-end: used for flexbox layout, which aligns the child elements
                inside a container along the main axis(default horizental) to the end of the container */}
                <ul className="nav navbar-dark col-md-4 justify-content-end">
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white">
                            Search Books
                        </a>
                    </li>
                </ul>
            </footer>

        </div>
    )
}