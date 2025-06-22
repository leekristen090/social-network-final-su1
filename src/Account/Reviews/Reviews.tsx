import { useEffect, useState } from "react";
import { Card, FormControl, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as reviewClient from "./client";

export default function Reviews() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { books } = useSelector((state: any) => state.booksReducer);
    const [reviews, setReviews] = useState<any[]>([]);

    const loadReviews = async () => {
        if (currentUser?._id) {
            const fetched = await reviewClient.fetchReviewsForUser(currentUser._id);
            const reviewsWithEditing = fetched.map((r: any) => ({ ...r, editing: false }));
            setReviews(reviewsWithEditing);
        }
    };
    useEffect(() => {
        loadReviews();
    }, [currentUser]);

    const removeReview = async (reviewId: string) => {
        await reviewClient.deleteReview(reviewId);
        setReviews(reviews.filter((r) => r._id !== reviewId));
    };
    const toggleEdit = (reviewId: string) => {
        setReviews(reviews.map((r) =>
            r._id === reviewId ? { ...r, editing: !r.editing } : r
        ));
    };
    const updateText = (reviewId: string, text: string) => {
        setReviews(reviews.map((r) =>
            r._id === reviewId ? { ...r, text } : r
        ));
    };
    const saveReview = async (review: any) => {
        const updated = {
            ...review,
            editing: false,
            timestamp: Date.now()
        };
        await reviewClient.updateReview(updated);
        setReviews(reviews.map((r) =>
            r._id === review._id ? updated : r
        ));
    };
    const reviewsWithTitles = reviews.map((r: any) => {
        const book = books.find((b: any) => b.googleBooksId === r.bookId);
        return { ...r, title: book ? book.title : "Unknown Book" };
    });
    if (!currentUser) return <div className={"sn-below-header"}>You must be signed in to view reviews.</div>;

    return (
        <div id={"sn-user-reviews"}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h3><b>Your Reviews</b></h3>
                    </Card.Title>
                    <Table striped style={{ width: "550px" }}>
                        <thead>
                        <tr>
                            <th>Book</th>
                            <th>Review</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {reviewsWithTitles.map((review: any) => (
                            <tr key={review._id}>
                                <td>
                                    <Link to={`/GoodBooks/Details/${review.bookId}`}>
                                        {review.title}
                                    </Link>
                                </td>
                                <td>
                                    {!review.editing && review.text}
                                    {review.editing && (
                                        <FormControl
                                            value={review.text}
                                            onChange={(e) =>
                                                updateText(review._id, e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    saveReview(review);
                                                }
                                            }}
                                        />
                                    )}
                                </td>
                                <td>{new Date(review.timestamp).toLocaleDateString()}</td>
                                <td>
                                    <FaPencil
                                        className={"fs-4 me-2"}
                                        onClick={() => toggleEdit(review._id)}
                                    />
                                    <FaTrash
                                        className={"text-danger fs-4"}
                                        onClick={() => removeReview(review._id)}
                                    />
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