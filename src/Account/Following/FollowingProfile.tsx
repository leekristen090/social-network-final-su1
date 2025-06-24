import {Link, useParams} from "react-router-dom";
import {Card, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import * as reviewClient from "../Reviews/client.ts";

export default function FollowingProfile() {
    const {userId} = useParams();
    const {users} = useSelector((state: any) => state.usersReducer);
    const {books} = useSelector((state: any) => state.booksReducer);
    const user = users.find((u: any) => u._id === userId);
    const [userReviews, setUserReviews] = useState<any[]>([]);
    const fetchUserReviews = async () => {
        if (userId) {
            const reviews = await reviewClient.fetchReviewsForUser(userId);
            const withTitles = reviews.map((r: any) => {
                const book = books.find((b: any) => b.googleBooksId === r.bookId);
                return { ...r, bookTitle: book ? book.title : "Unknown Book" };
            });
            setUserReviews(withTitles);
        }
    };
    // const book = userReviews.map(b => {
    //     const u = books.find((x: any) => x.googleBooksId === b.bookId);
    //     return {...b, bookTitle: u ? u.bookTitle : "Unknown book"}
    // });
    useEffect(() => {
        fetchUserReviews();
    }, []);
    if (!user) return <div>User Not Found</div>
    return (
        <div id={"sn-public-profile"}>
            <Card id={"sn-public-profile-card"}>
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>
                        {user.bio}
                        <hr/>
                        <h5>User Reviews</h5>
                    </Card.Text>
                    <Table striped id={"sn-public-profile-reviews"}>
                        <thead>
                        <tr>
                            <th>Book</th>
                            <th>Review</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userReviews.map((review: any) => (
                            <tr>
                                <td>
                                    <Link to={`/GoodBooks/Details/${review.bookId}`}>
                                        {review.bookTitle}
                                    </Link>

                                </td>
                                <td>{review.text}</td>
                                <td>{new Date(review.timestamp).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}