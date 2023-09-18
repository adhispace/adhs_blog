import React, { useEffect, useRef, useState } from "react";
import { submitComment } from '../services';

const CommentsForm = ({slug}) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])
  

  const handleCommentSubmission = () => {
    setError(false);

    const {value: comment} = commentEl.current;
    const {value: name} = nameEl.current;
    const {value: email} = emailEl.current;
    const {checked: storeData} = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = {name, email, comment, slug};

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }
    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    })
  }

  return (
    <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
        Leave a comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          name="comment"
          ref={commentEl}
          id=""
          cols="30"
          rows="3"
          placeholder="Comment"
          className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          placeholder="name"
          name="name"
          className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
        />
        <input
          type="text"
          ref={emailEl}
          placeholder="Email"
          name="email"
          className="w-full p-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input type="checkbox" ref={storeDataEl} name="storeData" id="storeData" value={true}/>
          <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save name and email for next time I comment</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>
    </div>
  );
};


export default CommentsForm;
