import React, { useState, useEffect } from 'react';
import './FeedbackForm.css'; // Import CSS file

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("http://localhost:3001/comments");
      if (response.ok) {
        const data = await response.json();
        
        console.log("Fetched comments data:", data);
        setComments(data.comments);
      } else {
        console.error("Failed to fetch comments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({
          name: '',
          message: ''
        });
        fetchComments(); // Refresh comments after submission
      } else {
        console.error("Failed to submit form data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="container"> {/* Apply container class */}
      <h2 className="title">Feedback Form</h2> {/* Apply title class */}
      <form onSubmit={handleSubmit}>
        <div className="inputGroup"> {/* Apply inputGroup class */}
          <label className="label" htmlFor="name">Name:</label> {/* Apply label class */}
          <input 
            className="input" 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="inputGroup"> {/* Apply inputGroup class */}
          <label className="label" htmlFor="message">Message:</label> {/* Apply label class */}
          <textarea 
            className="textarea" 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            rows="4" 
            required 
          />
        </div>
        <button className="button" type="submit">Submit</button> {/* Apply button class */}
      </form>

      <h2 className="commentsTitle">Comments</h2> {/* Apply commentsTitle class */}
      {/* <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>: {comment.message}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default FeedbackForm;
