import uniqid from 'uniqid';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { commentCreate, commentsLoad } from './redux/actions';

import SingleComments from './SingleComments';

function Comments() {
  const [textComment, setTextComment] = useState('');
  const comments = useSelector((state) => {
    const { commentsReducer } = state;

    return commentsReducer.comments;
  });

  const dispatch = useDispatch();

  const handleInput = (e) => {
    setTextComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uniqid();
    dispatch(commentCreate(textComment, id));
  };

  useEffect(() => {
    dispatch(commentsLoad())
  }, []);

  return (
    <div className="card-comments">
      <form className="comments-item-create" onSubmit={handleSubmit}>
        <input type="text" value={textComment} onChange={handleInput} />
        <input type="submit" hidden />
      </form>
      {!!comments.length &&
        comments.map((res) => {
          return <SingleComments key={res.id} data={res} />;
        })}
    </div>
  );
}

export default Comments;
