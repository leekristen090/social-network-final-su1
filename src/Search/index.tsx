export default function Search() {
    return (
        <div id={"sn-search"} className={"sn-below-header"}>
            {/*className={"d-flex flex-column align-items-center justify-content-center sn-below-header"}*/}
            <h1>Discover new books today!</h1><hr />
            <input id={"sn-search"} type={"text"}
                   placeholder={"Search by Title, Author, or Keyword..."} className={"w-75"}/>
            <button id={"sn-search-button"}>Search</button>
            <br /><br />
            could add like cards of books here too or do popular searches? im not sure yet
            <br/>
            or (look at good reads) could do like book genres and have them as links to searches?
        </div>
    );
}