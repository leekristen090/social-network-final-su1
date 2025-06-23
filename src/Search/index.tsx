// // export default function Search() {
// //     return (
// //         <div id={"sn-search"} className={"sn-below-header"}>
// //             {/*className={"d-flex flex-column align-items-center justify-content-center sn-below-header"}*/}
// //             <h1>Discover new books today!</h1><hr />
// //             <input id={"sn-search"} type={"text"}
// //                    placeholder={"Search by Title, Author, or Keyword..."} className={"w-75"}/>
// //             <button id={"sn-search-button"}>Search</button>
// //             <br /><br />
// //             could add like cards of books here too or do popular searches? im not sure yet
// //             <br/>
// //             or (look at good reads) could do like book genres and have them as links to searches?
// //         </div>
// //     );
// // }
import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { searchBooks } from '../Services/googleBooks';

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            thumbnail?: string;
        };
        publishedDate?: string;
        description?: string;
    };
}

export default function Search() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        try {
            const results = await searchBooks(query);
            setBooks(results);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="sn-search" className="sn-below-header">
            <h1>Discover new books today!</h1>
            <hr />

            <div className="d-flex mb-4">
                <input
                    type="text"
                    placeholder="Search by Title, Author, or Keyword..."
                    className="form-control"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                    className="btn sn-bg-tan ms-2"
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {isLoading && <p>Loading results...</p>}

            <Row xs={1} md={3} lg={4} className="g-4">
                {books.map((book) => (
                    <Col key={book.id}>
                        <Card className="h-100">
                            <Link to={`/GoodBooks/Details/${book.id}`}>
                                {book.volumeInfo.imageLinks?.thumbnail && (
                                    <Card.Img
                                        variant="top"
                                        src={book.volumeInfo.imageLinks.thumbnail}
                                        alt={book.volumeInfo.title}
                                        style={{ height: '200px', objectFit: 'contain' }}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{book.volumeInfo.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {book.volumeInfo.authors?.join(', ')}
                                    </Card.Subtitle>
                                    <Card.Text className="text-truncate">
                                        {book.volumeInfo.description}
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>

            {!isLoading && books.length === 0 && query && (
                <p>No books found. Try a different search term.</p>
            )}
        </div>
    );
}
