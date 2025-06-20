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
            <h1>Home</h1>
            <hr />
            <h2>Welcome to GoodBooks!</h2>
            Checkout trending books or see what other GoodBooks users are reading and reviewing!
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
                </div>
            )}
        </div>
    );
}