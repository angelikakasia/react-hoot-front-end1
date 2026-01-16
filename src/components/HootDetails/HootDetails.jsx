// src/components/HootDetails/HootDetails.jsx

import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";

import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";

const HootDetails = (props) => {
  const { hootId } = useParams();
  const { user } = useContext(UserContext);
  const [hoot, setHoot] = useState(null);

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(
      hootId,
      commentFormData
    );
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    await hootService.deleteComment(hootId, commentId);

    setHoot({
      ...hoot,
      comments: hoot.comments.filter(
        (comment) => comment._id !== commentId
      ),
    });
  };

  console.log("hoot state:", hoot);

  if (!hoot) return <main>Loading...</main>;

  return (
    <main>
      {/* Hoot details */}
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {`${hoot.author.username} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>

          {user && hoot.author._id === user._id && (
            <>
              <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
              <button onClick={() => props.handleDeleteHoot(hootId)}>
                Delete
              </button>
            </>
          )}
        </header>

        <p>{hoot.text}</p>
      </section>

      {/* Comments section */}
      <section>
        <h2>Comments</h2>

        {/* Add comment form */}
        {user && (
          <CommentForm handleAddComment={handleAddComment} />
        )}

        {!hoot.comments.length && (
          <p>There are no comments.</p>
        )}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>

              {/* Comment author actions */}
              {user && comment.author._id === user._id && (
                <>
                  <Link
                    to={`/hoots/${hootId}/comments/${comment._id}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() =>
                      handleDeleteComment(comment._id)
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </header>

            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
