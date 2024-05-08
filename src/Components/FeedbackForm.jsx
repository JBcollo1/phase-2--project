import React, { useState, useEffect } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    avatar: '', 
    message: ''
  });

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/comments")
      .then(r => r.json())
      .then(data => setComments(data))
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://localhost:3000/comments", {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setComments([...comments, data]);
      setFormData({ name: '', photo: '', avatar: '', message: '' });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="title">Comment Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
       
            <input 
              className="input inputLarge" 
              type="text" 
              id="name" 
              placeholder="User Name..."
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="inputGroup">
            
            <input 
              className="input inputLarge" 
              type="text" 
              id="avatar" 
              placeholder="Profile..."
              name="avatar" 
              value={formData.avatar} 
              onChange={handleChange} 
            />
          </div>
          <div className="inputGroup">
           
            <input 
              className="input inputLarge" 
              type="text" 
              id="photo" 
              placeholder="Photo..."
              name="photo" 
              value={formData.photo} 
              onChange={handleChange} 
              required 
            />
          </div>
         
          <div className="inputGroup">
      
            <textarea 
              className="textarea textareaLarge" 
              id="message" 
              placeholder="Comment..."
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              rows="4" 
              required 
            />
          </div>
          <button className="button" type="submit">Submit</button>
        </form>
      </div>

      <div className="commentsContainer">
        <h2 className="commentsTitle">Comments</h2>
        <div className="comments">
          <ul className="commentsList">
            {comments.map((comment, index) => (
              <li key={index} className="commentItem">
                <div className="commentCard">
                  <div className="userProfile">
                    <img src={comment.avatar} alt="User Avatar" className="avatar" />
                    <span className="userName">{comment.name}</span>
                  </div>
                  <p className="commentMessage">{comment.message}</p>
                  <img src={comment.photo} alt="Comment Photo" className="commentPhoto" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
