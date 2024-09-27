import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import { SpinnerLoading } from "../Utils/SpinnerLoading"

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>()
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    const bookId = (window.location.pathname).split('/')[2]

    useEffect(() => {
        // async function will return Promise object
        // so fetchBooks is a promise
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/${bookId}`

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
            if(!response.ok){
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
                img:responseJson.img
            }

            // useState hooks will update these value
            setBook(loadedBook)
            setIsLoading(false)
        }

        fetchBook().catch((error:any) => {
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
        <div>
            <h3>Hi world</h3>
        </div>
    )
}