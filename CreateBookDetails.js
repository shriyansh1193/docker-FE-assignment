import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateBookDetails() {
  const [formData, setFormData] = useState({ title: "", price: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Using fetch API
      // console.log(JSON.parse(formData));
      const response = await fetch("http://localhost:8080", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      const data = await response.json();
      e.target.reset();

      // Using Axios
      //   const response = await axios.post('YOUR_API_ENDPOINT', formData);
      //   const data = response.data;

      if (response.status === 200 || response.status === 201) {
        // Adjust based on your API's success codes

        // Optionally, clear the form
        setFormData({ name: "", email: "" });
        console.log(data);
      }
    } catch (err) {
      console.error("API call error:", err);
    }
  };

  return (
    <Form
      style={{ width: "18rem", marginTop: "50px", marginLeft: "50px", marginRight: "200px" }}
      onSubmit={ev => handleSubmit(ev)}
    >

      <Form.Group className="mb-3" controlId="bookTitle">
        <Form.Label>Book title</Form.Label>
        <Form.Control
          name="title"
          placeholder="Enter Book Title"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="bookPrice">
        <Form.Label>Book Price</Form.Label>
        <Form.Control
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateBookDetails;
