import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateBookDetails() {
  const [formData, setFormData] = useState({ title: "", price: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setError(null);

    try {
      // Using fetch API
      console.log(formData);
      const response = await fetch("http://172.24.217.189:8080", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // Using Axios
      //   const response = await axios.post('YOUR_API_ENDPOINT', formData);
      //   const data = response.data;

      if (response.status === 200 || response.status === 201) {
        // Adjust based on your API's success codes
        setResponseMessage("Form submitted successfully!");
        // Optionally, clear the form
        setFormData({ name: "", email: "" });
        console.log(data)
      } else {
        setError(data.message || "Submission failed.");
      }
    } catch (err) {
      setError("An error occurred during submission.");
      console.error("API call error:", err);
    }
  };

  return (
    <Form style={{ width: "18rem", marginTop: "50px", marginLeft: "50px" }} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="bookTitle">
        <Form.Label>Book title</Form.Label>
        <Form.Control name="title" placeholder="Enter Book Title" onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="bookPrice">
        <Form.Label>Book Price</Form.Label>
        <Form.Control name="price" placeholder="Price" onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateBookDetails;
