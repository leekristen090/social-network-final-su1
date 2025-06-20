import {Button, Card, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import * as db from "../Database";
import {useEffect, useState} from "react";

export default function Home() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const handleDetailsClick = (bookId: string) => {
        navigate(`/GoodBooks/Details/${bookId}`);
    };
    const [localBooks, setLocalBooks] = useState<any[]>([]);
    const fetchBooks = () => {
        const homeBooks = db.books;
        setLocalBooks(homeBooks);
    }
    useEffect(() => {
        fetchBooks();
    }, []);
    return (
        <div id={"sn-home"} className={"sn-below-header"}>
            <div className={"justify-content-center align-content-center"}>
                <h1>Welcome to GoodBooks!</h1>
            </div>

            <hr />
            <Row className={"justify-content-center"}>
                <Col>
                    <h4>Looking for something new?</h4>
                    You're in the right place.
                </Col>
                <Col>
                    <h4>Connect with other GoodBooks users!</h4>
                    See what other users are saying are their favorite (and least favorite) books are.
                </Col>
            </Row>

            <hr />
            <h3>Trending Books</h3>
            <hr />
            <Row xs={1} md={5} className={"g-4"}>
                {localBooks.map((book: any) => (
                    <Col style={{width: "270px"}} key={book.googleBooksId}>
                        <Card id={"sn-book-card"}>
                            <Card.Img id={"sn-book-card-img"} variant={"top"} src={`${book.coverURL}`}
                                      width={"100%"} />
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
            {currentUser && (
                <div>
                    <h3>Following</h3><hr />
                    reviews from other GoodBooks users you follow
                    <Card>
                        <Card.Header className={"sn-bg-tan"}>Book</Card.Header>
                        <Card.Body>
                            <blockquote className={"blockquote"}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam at consectetur ea illum, ipsa iusto libero, maiores odio omnis porro praesentium quis totam vero voluptate. Animi corporis error quae?
                                </p>
                                <footer className={"blockquote-footer"}>
                                    user
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}