import { Link } from "react-router-dom"

export const ExploreTopBooks = () => {
    return(
        // p-5: set padding as 5
        // mb-4: set margin-bottom as 4
        <div className="p-5 mb-4 bg-dark header">
            {/* container-fluid: this content is inside a full-width container
                d-flex: set the display as flexbox
            */}
            <div className="container-fluid py-5 text-white
            d-flex justify-content-center align-items-center">
                <div>
                    {/* display-5: display heading class, makes the text larger compared to standard headings
                        fw-bold: applies bold styling to the text
                        col-md-8: define the column width for medium and large screens
                        fs-4: set the font size, makes the text one size larger than the default size
                    */}
                    <h1 className="display-5 fw-bold">Find your next adventure</h1>
                    <p className="col-md-8 fs-4">Where would you like to go next?</p>
                    <Link type="button" className="btn main-color btn-lg text-white" to="/search">
                        Explore top books
                    </Link>
                </div>
            </div>
        </div>
    )
}