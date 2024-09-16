import { useState,useEffect } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBooks";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {
        // async function will return Promise object
        // so fetchBooks is a promise
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books"
            // the carousel conponent includes 9 books
            const url: string = `${baseUrl}?page=0&size=5`


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
    }, [])

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
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2" type="search"
                                placeholder="Search" aria-labelledby="Search"/>
                                <button className="btn btn-outline-success">
                                    Search
                                </button>
                            </div>
                        </div>
                            <div className="col-4">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton1" data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                        Category
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                All
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Front End
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Back End
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Data
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                DevOps
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                    <div className="mt-3">
                        <h5>Number of results:(22)</h5>
                    </div>
                    <p>
                        1 to 5 of 22 items:
                    </p>
                     {books.map(book => (
                        <SearchBook book={book} key={book.id}/>
                     ))}
                </div>
            </div>
        </div>
    )

}
