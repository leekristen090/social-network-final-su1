import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import {useEffect, useState} from "react";
import ReviewForm from "../Account/Reviews/ReviewForm.tsx";
import {useSelector} from "react-redux";
import {Outlet} from "react-router";
import * as reviewClient from "../Account/Reviews/client.ts";
import {getBookDetails} from "../Services/googleBooks.ts";

export default function BookDetails() {
    const {bid} = useParams();
    const {books} = useSelector((state: any) => state.booksReducer);
    const {users} = useSelector((state: any) => state.usersReducer);
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();

    // const [book, setBook] = useState(null);
    const [book, setBook] = useState({
        googleBooksId: '',
        bookTitle: '',
        authors: '',
        description: '',
        coverURL: ''
    });
    const [reviewText, setReviewText] = useState("");
    const [show, setShow] = useState(false);
    const [bookReviews, setBookReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (currentUser) {
            setShow(true);
        } else {
            navigate("/GoodBooks/Account/Signin");
        }
    };

    const handleAddReview = async () => {
        if (!currentUser || !bid || !reviewText.trim()) return;

        try {
            const newReview = {
                bookId: bid,
                bookTitle: book.bookTitle,
                userId: currentUser._id,
                username: currentUser.username,
                text: reviewText,
                timestamp: new Date().toISOString()
            };
            console.log("Review being saved:", newReview);
            await reviewClient.createReview(newReview);
            await fetchBookReviews();
            setReviewText("");
            setShow(false);
        } catch (err) {
            console.error("Failed to create review:", err);
            alert("Failed to submit review. Please try again.");
        }
    };
    const getUsername = (review: any) => {
        if (review.username) return review.username;
        if (review.userId === currentUser?._id) return currentUser.username || "You";
        const user = users.find((u: any) => u._id === review.userId);
        return user?.username || "Unknown User";
    };
    const fetchBookReviews = async () => {
        if (bid) {
            const reviews = await reviewClient.fetchReviewsForBook(bid);
            setBookReviews(reviews);
        }
    };
    const isGoogleBookId = (id: any) => {
        return !id?.startsWith('local_');
    };
    const normalizeBookData = (bookData: any) => {
        if (bookData.volumeInfo) {
            // Google Books API format
            return {
                googleBooksId: bookData.id,
                bookTitle: bookData.volumeInfo.title,
                authors: bookData.volumeInfo.authors?.join(', '),
                description: bookData.volumeInfo.description,
                coverURL: bookData.volumeInfo.imageLinks?.thumbnail
            };
        }
        // Local book format
        return bookData;
    };
    useEffect(() => {
        const fetchBookData = async () => {
            setLoading(true);
            try {
                let bookData;
                if (isGoogleBookId(bid)) {
                    bookData = await getBookDetails(bid);
                } else {
                    bookData = books.find((b: any) => b.googleBooksId === bid);
                }
                setBook(normalizeBookData(bookData));
                await fetchBookReviews();
            } catch (error) {
                console.error("Error fetching book data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookData();
    }, [bid, books]);

    if (loading) {
        return <div className="sn-below-header">Loading book details...</div>;
    }

    if (!book) {
        return <div className="sn-below-header">Book not found</div>;
    }

    return (
        <div id="sn-book-details" className="sn-below-header">
            <h1>{book.bookTitle}</h1>
            {/*{location.state?.fromSearch && (*/}
            {/*    <Button*/}
            {/*        variant="outline-secondary"*/}
            {/*        onClick={() => navigate('/GoodBooks/Search', {*/}
            {/*            state: {*/}
            {/*                fromDetails: true,*/}
            {/*                searchQuery: location.state.searchQuery,*/}
            {/*                searchResults: location.state.searchResults*/}
            {/*            }*/}
            {/*        })}*/}
            {/*    >*/}
            {/*        Back to Search*/}
            {/*    </Button>*/}
            {/*)}*/}
            <hr />
            <div className="d-flex">
                <div className="flex-fill me-3">
                    <h4><b>Author(s):</b></h4>
                    {book.authors || "Unknown author"}
                    <br/><br/>
                    <h4><b>Description:</b></h4>
                    {book.description || "No description available"}
                </div>
                {book.coverURL && (
                    <div className="d-none d-xl-block">
                        <img src={book.coverURL} alt={book.bookTitle} height={200} />
                    </div>
                )}
            </div>
            <hr />
            <h3>
                Reviews from other GoodBooks users
                <Button className="float-end sn-bg-tan" onClick={handleShow}>
                    <FaPlus className="me-1" />Review
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
                {bookReviews.map((review: any) => (
                    <tr key={review._id}>
                        <td>
                            <Link to={`User/${review.userId}`}>
                                {getUsername(review)}
                            </Link>
                        </td>
                        <td>{review.text}</td>
                        <td>{new Date(review.timestamp).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <ReviewForm
                show={show}
                handleClose={handleClose}
                dialogTitle="Add Review"
                bookTitle={book.bookTitle}
                setReview={setReviewText}
                addReview={handleAddReview}
            />
            <Outlet />
        </div>
    );
}