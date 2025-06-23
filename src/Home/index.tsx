import {Button, Card, Col, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import * as db from "../Database";
import {useEffect, useState} from "react";
import * as followingClient from "../Account/Following/client.ts";
import * as reviewClient from "../Account/Reviews/client.ts";

export default function Home() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    //const {following} = useSelector((state: any) => state.followingReducer);
    const navigate = useNavigate();
    const handleDetailsClick = (bookId: string) => {
        navigate(`/GoodBooks/Details/${bookId}`);
    };
    const [localBooks, setLocalBooks] = useState<any[]>([]);
    const [followingReviews, setFollowingReviews] = useState<any[]>([]);
    const fetchBooks = () => {
        const homeBooks = db.books;
        setLocalBooks(homeBooks);
    };
    const fetchFollowingReviews = async () => {
        if (!currentUser) return;
        const following = await followingClient.fetchFollowing(currentUser._id);
        const followingIds = following.filter((f: any) => f.user === currentUser._id).map((f: any) => f.target);
        let allReviews: any[] = [];
        for (const userId of followingIds) {
            const userReviews = await reviewClient.fetchReviewsForUser(userId);
            allReviews = allReviews.concat(userReviews);
        }
        const enrichedReviews = allReviews.map((review: any) => {
            const book = db.books.find(b => b.googleBooksId === review.bookId);
            const user = db.users.find(u => u._id === review.userId);
            return {
                ...review,
                bookTitle: book?.title || "Unknown Book",
                bookCover: book?.coverURL,
                username: user?.username || "Unknown User"
            };
        });

        setFollowingReviews(enrichedReviews);
    };

    useEffect(() => {
        fetchBooks();
        fetchFollowingReviews();
    }, [currentUser, localBooks]);
    return (
        <div id={"sn-home"} className={"sn-below-header"}>
            {!currentUser && (
                <div className={"justify-content-center align-content-center"}>
                    <h1>Welcome to GoodBooks!</h1>
                </div>
            )}
            {currentUser && followingReviews.length > 0 && (
                <div id={"sn-following-activity"}>
                    <h2>Activity</h2>
                    {followingReviews.map((review, index) => (
                        <Card key={index} className={"mb-2"} id={"sn-following-review-card"}>
                            <Card.Header className={"sn-bg-tan"}>
                                <Button variant={"link"} onClick={() => handleDetailsClick(review.bookId)}>
                                    <strong>{review.bookTitle}</strong>
                                </Button>
                                <small className={"float-end text-muted"}>{new Date(review.timestamp).toLocaleDateString()}</small>
                            </Card.Header>
                            <Card.Body>
                                <blockquote className={"blockquote"}>
                                    <p>
                                        {review.text}
                                    </p>
                                    <footer className={"blockquote-footer"}>
                                        {review.username}
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
            {currentUser && followingReviews.length === 0 && (
                <div>
                    <h2>Activity</h2>
                    <p>No recent activity from users you follow</p>
                    <p>Discover and follow more users to see their reviews!</p>
                </div>
            )}
            <hr />
            <Row className={"justify-content-center"}>
                <Col md={6}>
                    <h4>Looking for something new?</h4>
                    <p>
                        You're in the right place. Find new books today
                    </p>
                </Col>
                <Col md={6}>
                    <h4>Connect with other GoodBooks users!</h4>
                    <p>
                        See what other users are saying their favorite (and least favorite) books are.
                    </p>
                </Col>
            </Row>
            <hr />
            <h3>Trending Books</h3>
            <hr />
            <Row xs={1} md={5} className={"g-4"} id={"sn-home-trending-books"}>
                {localBooks.map((book: any) => (
                    <Col style={{width: "270px"}} key={book.googleBooksId}>
                        <Card id={"sn-book-card"}>
                            <Link to={`/GoodBooks/Details/${book.googleBooksId}`}>
                                <Card.Img id={"sn-book-card-img"} variant={"top"} src={`${book.coverURL}`}
                                          width={"100%"} />
                            </Link>
                            <Card.Body id={"sn-book-card-body"} className={"sn-bg-tan"}>
                                <Card.Title id={"sn-book-card-title"}>
                                    {book.title}
                                </Card.Title>
                                {/*<Card.Text id={"sn-book-card-text"}>*/}
                                {/*    {book.description}*/}
                                {/*</Card.Text>*/}
                                <Button id={"sn-book-card-btn"} className={"btn m-1 sn-bg-cream"}
                                        onClick={() => handleDetailsClick(book.googleBooksId)}>
                                    Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <hr/>
        </div>
    );
}