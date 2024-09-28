import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";

// | undefined: This means that the book property can either be of type BookModel or undefined. 
// This is useful for handling cases where a book may not be provided (e.g., the component is used before the book data is loaded).
//  the mobile property must be a boolean value (true or false). It could be used to determine 
// if the component should render differently based on whether it’s being viewed on a mobile device.
export const CheckoutAndReviewBox: React.FC<{ book: BookModel | undefined, mobile: boolean }> = (props) => {
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>0/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                <Link to='/#' className='btn btn-success btn-lg'>Sign in</Link>
                <hr/>
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                <p>
                    Sign in to be able to leave a review.
                </p>
            </div>
        </div>
    );
}