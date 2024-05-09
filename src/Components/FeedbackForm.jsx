





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
  const newComment = { ...formData, like: 0 }
  const handleSubmit = (e) => { 
    e.preventDefault();
    
    fetch("http://localhost:3000/comments", {
      method: 'POST',
      body: JSON.stringify(newComment),
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

  const getRandomColor = () => {
   
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };


  const handleLike = (index) => {
    const updatedComments = [...comments];
    const commentToUpdate = updatedComments[index];
  
    

    commentToUpdate.like++;
  
  
    fetch(`http://localhost:3000/comments/${commentToUpdate.id}`, {
      method: 'PUT', 
      body: JSON.stringify(commentToUpdate),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(updatedComment => {
    
      updatedComments[index] = updatedComment;
      setComments(updatedComments);
    })
    .catch(error => {
      console.error('Error updating like count:', error);
    });
  };
  
  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="title">Comment Form</h2>
        <form onSubmit={handleSubmit}>
        <div className="inputGroup">
       
       //             <input 
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
                    {comment.avatar ? (
                      <img src={comment.avatar} alt="User Avatar" className="avatar" />
                    ) : (
                      <div className="avatar" style={{ backgroundColor:getRandomColor() }}>
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="userName">{comment.name}</span>
                  </div>
                  <p className="commentMessage">{comment.message}</p>
                  {comment.photo && <img src={comment.photo} alt="Comment Photo" className="commentPhoto" />}
                  <button onClick={() => handleLike(index)}  className='like'>
                     <span className="like-icon"> ❤️</span> {comment.like}
                  </button>
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



