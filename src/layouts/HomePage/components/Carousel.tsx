import { ReturnBook } from "./ReturnBook"
import { useEffect, useState } from "react"
import BookModel from "../../../models/BookModel"
import { SpinnerLoading } from "../../Utils/SpinnerLoading"
import { Link } from "react-router-dom"

export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null)


    // check the note on JS asynchronous functions
    useEffect(() => {
        // async function will return Promise object
        // so fetchBooks is a promise
        const fetchBooks = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`
            // the carousel conponent includes 9 books
            const url: string = `${baseUrl}?page=0&size=9`


            //await keyword can only be used inside the async function
            //await keyword means fetch() is another async function and also returns a promise
            // and it directly returns the final result after the promise is executed

            /**
             * Here, fetch() also returns a Promise and will be parsed as a Response when succeed
             * and rejected when net error occurs(200 state) and throw the exception
             */
            const response = await fetch(url)
            
            // fetch() does not throw exceptions when the brower returns 4xx or 5xx state
            // so we need to check response.ok manually
            if(!response.ok){
                throw new Error('Something went wrong!')
            }

            const responseJson = await response.json()

            //abstract a book array from wrapped _embedded fields
            const responseData = responseJson._embedded.books

            const loadedBooks: BookModel[] = []

            for(const key in responseData){
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img:responseData[key].img
                })
            }
            
            // useState hooks will update these value
            setBooks(loadedBooks)
            setIsLoading(false)
        }

        fetchBooks().catch((error:any) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, []);

    if(isLoading){
        return (
            <SpinnerLoading/>
        )
    }

    if(httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        // mt-5: set margin top as 5
        // in jsx,inline style require two sets of curly braces{}
        // the outer {} is used to embed js expressions
        // the inner {} is used to define a js object, which contains
        // the style properties and their corresponding values
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carsousel-title">
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            {/* data-bs-interval='false': used to control the carousel component's behaviours
                which its disables automatic cycling.
                d-none: a display utility class, it hides the element completely making the carousel
                invisible on all screen sizes by default
                d-lg-block: works with d-none and is a responsive display utility, making the element 
                visible only on larger(lg) screens and above. That means in smaller screens like iphone,
                the carousel elements are invisible
            */}
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5
            d-none d-lg-block" data-bs-interval='false'>

                {/* Desktop */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {/* when use param => () no need for return, while param=>{return ...}  */}
                            {books.slice(0,3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                        <div className="row d-flex justify-content-center align-items-center">
                            {/* when use param => () no need for return, while param=>{return ...}  */}
                            {books.slice(3,6).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                        <div className="row d-flex justify-content-center align-items-center">
                            {/* when use param => () no need for return, while param=>{return ...}  */}
                            {books.slice(6,9).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button"
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className="carousel-control-prev-icon" aria-hidden='true'></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className="carousel-control-next-icon" aria-hidden='true'></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/*Mobole*/}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnBook book={books[7]} key={books[7].id}/>
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <Link className="btn btn-outline-secondary btn-lg" to="/search">View More</Link>
            </div>
        </div>
    )
}