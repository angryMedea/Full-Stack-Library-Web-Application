import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import { SpinnerLoading } from "../Utils/SpinnerLoading"
import { StarsReview } from "../Utils/StarsReview"
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox"

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>()
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    const bookId = (window.location.pathname).split('/')[2]

    useEffect(() => {
        // async function will return Promise object
        // so fetchBooks is a promise
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`

            //await keyword can only be used inside the async function
            //await keyword means fetch() is another async function and also returns a promise
            // and it directly returns the final result after the promise is executed

            /**
             * Here, fetch() also returns a Promise and will be parsed as a Response when succeed
             * and rejected when net error occurs(200 state) and throw the exception
             */
            const response = await fetch(baseUrl)

            // fetch() does not throw exceptions when the brower returns 4xx or 5xx state
            // so we need to check response.ok manually
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseJson = await response.json()


            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            }

            // useState hooks will update these value
            setBook(loadedBook)
            setIsLoading(false)
        }

        fetchBook().catch((error: any) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            {/* show in big screen and hide in smaller one */}
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {/* book？the question mark represents optional chaining.
                        It will check first if book exists, if yes, then access book.img.
                        The second question mark is the tertiary operator.
                        */}
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt='Book' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')}
                                width='226' height='349' alt='Book' />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={4} size={32}/>
                        </div>
                    </div>
                        <CheckoutAndReviewBox book={book} mobile={false}/>
                </div>
                <hr />
            </div>
            {/* show img in small screen */}
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ?
                    <img src={book?.img} width='226' height='349' alt='Book'/>
                    :
                    <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                    height='349' alt='Book'/>
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={4} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true}/>
                    <hr/>
            </div>
        </div>
    )
}