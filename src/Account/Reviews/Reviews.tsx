import {Card, FormControl, Table} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {deleteReview, editReview, updateReview} from "./reducer.ts";

export default function Reviews() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const {reviews} = useSelector((state: any) => state.reviewsReducer);
    const {books} = useSelector((state: any) => state.booksReducer);
    const review = reviews.filter((r: any) => r.userId === currentUser._id);
    const book = review.map((b: any) => {
        const u = books.find((x: any) => x.googleBooksId === b.bookId);
        return {...b, title: u ? u.title : "Unknown book"}
    });
    const removeReview = (reviewId: string) => {
        dispatch(deleteReview(reviewId));
    };
    // const [show, setShow] = useState(false);
    // const handleClose= () => setShow(false);
    // const handleShow = () => setShow(true);
    if (!reviews) return <div className={"sn-below-header"}>Review not found</div>;
    return (
        <div id={"sn-user-reviews"}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h3><b>Your Reviews</b></h3>
                        {/*<Button className={"sn-bg-tan"} onClick={handleShow}>*/}
                        {/*    <FaPlus className={"me-1 mb-1"}/>*/}
                        {/*    New Review*/}
                        {/*</Button>*/}
                    </Card.Title>
                    <Table striped style={{width: "550px"}}>
                        <thead>
                        <tr>
                            <th>Book</th>
                            <th>Review</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {book.map((review: any) => (
                            <tr key={review._id}>
                                <td>
                                    <Link to={`/GoodBooks/Details/${review.bookId}`}>
                                        {review.title}
                                    </Link>
                                </td>
                                <td>
                                    {/*{review.text}*/}
                                    {!review.editing && review.text}
                                    {review.editing && (
                                        <FormControl defaultValue={review.text}
                                                     onChange={(e) => dispatch(updateReview({...review, text: e.target.value}))}
                                                     onKeyDown={(e) => {
                                                         if (e.key === "Enter") {
                                                             dispatch(updateReview({...review, editing: false, timestamp: Date.now()}));
                                                         }
                                                     }} />
                                    )}
                                </td>
                                <td>{new Date(review.timestamp).toLocaleDateString()}</td>
                                <td>
                                    <FaPencil  className={"fs-4 me-2"} onClick={() => dispatch(editReview(review._id))} />
                                    <FaTrash className={"text-danger fs-4"} onClick={() => removeReview(review._id)} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            {/*<ReviewForm show={show} handleClose={handleClose} dialogTitle={"Add Review"} />*/}
        </div>
    );
}