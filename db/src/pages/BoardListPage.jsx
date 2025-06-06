import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BoardListPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch(`/api/posts?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then(setPosts);
  }, [page, limit]);

  return (
    <div className="p-4 text-white bg-[#1e1e1e] min-h-screen">
      <h1 className="text-2xl mb-4">게시판</h1>
      <div className="mb-4">
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="text-black p-1"
        >
          {[10, 20, 30, 40, 50].map((n) => (
            <option key={n} value={n}>
              {n}개씩 보기
            </option>
          ))}
        </select>
        <Link
          to="/posts/new"
          className="ml-4 px-3 py-1 bg-blue-500 rounded text-white"
        >
          글쓰기
        </Link>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b p-2">번호</th>
            <th className="border-b p-2">제목</th>
            <th className="border-b p-2">작성자</th>
            <th className="border-b p-2">등록일</th>
            <th className="border-b p-2">댓글수</th>
            <th className="border-b p-2">좋아요</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.id}</td>
              <td className="p-2">
                <Link to={`/posts/${p.id}`} className="text-blue-400 underline">
                  {p.title}
                </Link>
              </td>
              <td className="p-2">{p.author.name}</td>
              <td className="p-2">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2">{p._count.comments}</td>
              <td className="p-2">{p._count.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-2 py-1 bg-gray-700 rounded"
        >
          이전
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-2 py-1 bg-gray-700 rounded"
        >
          다음
        </button>
      </div>
    </div>
  );
}