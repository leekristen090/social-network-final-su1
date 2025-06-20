import {Button, Card, Table} from "react-bootstrap";
import {FaPlus, FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import * as db from "../Database";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

export default function Reviews() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const reviews = db.reviews.filter(r => r.userId === currentUser._id);
    const book = reviews.map(b => {
        const u = db.books.find(x =>x.googleBooksId === b.bookId);
        return {...b, title: u ? u.title : "Unknown book"}
    });
    if (!reviews) return <div className={"sn-below-header"}>Review not found</div>;
    return (
        <div id={"sn-user-reviews"}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h3><b>Your Reviews</b></h3>
                        <Button className={"sn-bg-tan"}>
                            <FaPlus className={"me-1 mb-1"}/>
                            New Review
                        </Button>
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
                                <td>{review.text}</td>
                                <td>{new Date(review.timestamp).toLocaleDateString()}</td>
                                <td>
                                    <FaPencil  className={"fs-4 me-2"} />
                                    <FaTrash className={"text-danger fs-4"} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}