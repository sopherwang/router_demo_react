import {useCallback, useEffect, useState} from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import {useParams} from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {getAllComments, getSingleQuote} from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params=useParams()
  const {quoteId} = params

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const {sendRequest, status, data: loadedComments, error} = useHttp(getAllComments)
  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  let comments;
  if (status === 'pending') {
    comments = <div className='centered'><LoadingSpinner/></div>
  }

  if (error) {
    comments = <p className='centered focused'>{error}</p>
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments}/>
  } else {
    comments = <p className='centered'>No comments added yet</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
