import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

function ShowBooks() {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080', {
                method: "GET"
            });
            const jsonData = await response.json();
            console.log(jsonData);
            setData([...jsonData]);

        } catch (error) {
            console.error(error);
        }
    };

    async function deleteData(id) {
        console.log(id);
        try {
            const response = await fetch(`http://localhost:8080/${id}`, {
                method: "DELETE"
            });
            fetchData();

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        fetchData();
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <Button variant="primary" onClick={handleRefresh}>Refresh</Button>
            {data.map(item => (
                <Card style={{ width: '18rem', margin: "10px" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                    <Card.Body key={item.id}>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Body>Price of book: {item.price}</Card.Body>
                    </Card.Body>
                    <Button variant="danger" onClick={() => deleteData(item.id)} style={{ margin: "20px" }}>Delete Book</Button>
                </Card>
            ))
            }
        </div>

    );
}

export default ShowBooks;