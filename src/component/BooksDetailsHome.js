import { Col, Container, Row } from "react-bootstrap";
import CreateBookDetails from "./CreateBookDetails";
import ShowBooks from "./ShowBooks";

function BooksDetailsHome() {
    return (
        <Container>
            <Row>
                <Col>
                    <CreateBookDetails />
                </Col>
                <Col>
                    <ShowBooks />
                </Col>
            </Row>
        </Container>
    );
}

export default BooksDetailsHome;