import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import {useEffect, useState} from "react";
import ReviewForm from "../Account/Reviews/ReviewForm.tsx";
import {useSelector} from "react-redux";
import {Outlet} from "react-router";
import * as reviewClient from "../Account/Reviews/client.ts";

export default function BookDetails() {
    const {bid} = useParams();
    const {books} = useSelector((state: any) => state.booksReducer);
    const {users} = useSelector((state: any) => state.usersReducer);
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const book = books.find((b: any) => b.googleBooksId === bid);
    const [reviewText, setReviewText] = useState("");
    const [show, setShow] = useState(false);
    const [bookReviews, setBookReviews] = useState<any[]>([]);
    const handleClose= () => setShow(false);
    const handleShow = () => {
        if (currentUser) {
            setShow(true);
        } else {
            navigate("/GoodBooks/Account/Signin");
        }
    };
    const handleAddReview = async () => {
        if (!currentUser) return;
        const newReview = await reviewClient.createReview({
            bookId: bid,
            userId: currentUser._id,
            text: reviewText,
            timestamp: Date.now()
        });
        setBookReviews([...bookReviews, newReview]);
        setReviewText("");
        setShow(false);
    };
    const reviewer = bookReviews.map((review: any) => {
        const r = users.find((user: any) => user._id === review.userId);
        return {...review, username: r ? r.username : "Unknown User"};
    });
    const fetchBookReviews = async () => {
        if (bid) {
            const reviews = await reviewClient.fetchReviewsForBook(bid);
            setBookReviews(reviews);
        }
    };
    useEffect(() => {
        fetchBookReviews();
    }, [bid]);
    if (!book) return <div className={"sn-below-header"}>Book not found</div>;
    return (
        <div id={"sn-book-details"} className={"sn-below-header"}>
            <h1>{book.title}</h1><hr />
            <div className={"d-flex"}>
                <div className={"flex-fill me-3"}>
                    <h4><b>Author(s):</b></h4>
                    {book.authors}<br/><br/>
                    <h4><b>Description:</b></h4>
                    {book.description}
                </div>
                <div className={"d-none d-xl-block"}>
                    <img src={`${book.coverURL}`} alt={book.title} height={200}/>
                </div>
            </div>
            <hr />
            <h3>
                Reviews from other GoodBooks users
                <Button className={"float-end sn-bg-tan"} onClick={handleShow}>
                    <FaPlus className={"me-1"} />Review
                </Button>
            </h3>
            <Table striped>
                <thead>
                <tr>
                    <th>User</th>
                    <th>Review</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {reviewer.map((review: any) => (
                    <tr key={review._id}>
                        <td>
                            <Link to={`User/${review.userId}`}>
                                {review.username}
                            </Link>
                        </td>
                        <td>{review.text}</td>
                        <td>{new Date(review.timestamp).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <ReviewForm show={show} handleClose={handleClose}
                        dialogTitle={"Add Review"} bookTitle={book.title}
                        setReview={setReviewText} addReview={handleAddReview} />
            <Outlet />
        </div>
    );
}