import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then(setPost);
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: comment }),
    });
    if (res.ok) {
      const newComment = await res.json();
      setPost({ ...post, comments: [...post.comments, newComment] });
      setComment("");
    } else {
      alert("댓글 작성 실패");
    }
  };

  const toggleLike = async () => {
    const res = await fetch(`/api/posts/${id}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const { liked } = await res.json();
      setPost({
        ...post,
        likes: liked
          ? [...post.likes, { userId: 0, id: Date.now(), postId: post.id }]
          : post.likes.slice(0, -1),
      });
    }
  };

  const deletePost = async () => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 204) {
      navigate("/posts");
    } else {
      alert("삭제 실패");
    }
  };

  if (!post) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="p-4 text-white bg-[#1e1e1e] min-h-screen">
      <Link to="/posts" className="underline">
        목록으로
      </Link>
      <h1 className="text-2xl mb-2 mt-2">{post.title}</h1>
      <p className="text-sm mb-4">
        작성자: {post.author.name} | {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
      <div className="mb-4">
        <button onClick={toggleLike} className="px-2 py-1 bg-blue-500 rounded">
          좋아요 {post.likes.length}
        </button>
        <button
          onClick={deletePost}
          className="ml-2 px-2 py-1 bg-red-500 rounded"
        >
          삭제
        </button>
      </div>
      <h2 className="text-xl mb-2">댓글</h2>
      <ul>
        {post.comments.map((c) => (
          <li key={c.id} className="border-b p-2">
            <p className="text-sm">
              {c.user.name} | {new Date(c.createdAt).toLocaleString()}
            </p>
            <p>{c.content}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleComment} className="mt-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-24 p-2 text-black rounded"
          required
        />
        <button type="submit" className="mt-2 px-4 py-1 bg-blue-500 rounded">
          댓글 작성
        </button>
      </form>
    </div>
  );
}