import React from "react";
import BookModel from "../../../models/BookModel";
import { Link } from "react-router-dom";

// The generic parameter { book: BookModel } following React.FC indicates that the props of this function component
// include a property named book and its type is BookModel
export const ReturnBook: React.FC<{book:BookModel}> = (props) => {
    return (
        // these 'col-xxx' classes define the column size for different screen sizes based on Bootstrap's grid system
        // this is a responsive design
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3" >
            {/* Using require(), which is a js snippet, helps ensure that images resources are handled correctly
                                during the build...and better manage and optimize these static processes */}
            <div className="text-center">
                {/* use ternary expression */}
                {props.book.img ?
                <img
                    src={props.book.img}
                    width='151'
                    height='233'
                    alt="book"
                />
            :
                <img
                    src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                    width='151'
                    height='233'
                    alt="book"
                />
            }
                <h6 className="mt-2">{props.book.title}</h6>
                <p>{props.book.author}</p>
                <Link className="btn main-color text-white" to={`checkout/${props.book.id}`}>Reserve</Link>
            </div >
        </div>
    )
}