import React from "react";

export const ReturnBook = () => {
    return (
        // these 'col-xxx' classes define the column size for different screen sizes based on Bootstrap's grid system
        // this is a responsive design
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3" >
            {/* Using require(), which is a js snippet, helps ensure that images resources are handled correctly
                                during the build...and better manage and optimize these static processes */}
            <div className="text-center">
                <img
                    src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                    width='151'
                    height='233'
                    alt="book"
                />
                <h6 className="mt-2">Book</h6>
                <p>Page Turner</p>
                <a className="btn main-color text-white" href="#">Reserve</a>
            </div >
        </div>
    )
}