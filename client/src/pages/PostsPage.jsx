import { useState } from "react";

import { createPost, getPostsUrl, POSTS_URL } from "../api/posts";
import { useQuery } from "../hooks/useQuery";
import { useDebounce } from "../hooks/useDebounce";
import { useAuth } from "../hooks/useAuth";
import List from "../components/List";
import Button from "../components/ui/Button";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../components/ui/ErrorMessage";
import PostForm from "../components/PostForm";

export default function PostsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [add, setAdd] = useState(false);

  const { userId } = useAuth();
  const debouncedValue = useDebounce(searchValue);
  const { data, error, isLoading, refetch } = useQuery(
    getPostsUrl(userId, debouncedValue),
    !userId
  );

  if (error) {
    return <ErrorMessage />;
  }

  const handleSubmit = async (title, body) => {
    await createPost({ userId, title, body });
    setAdd(false);
    refetch();
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">Posts</h2>
          <div className="page-actions">
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <Button
              text="Toggle post form"
              handleClick={() => setAdd((p) => !p)}
              className={add ? "btn-secondary" : "btn-primary"}
            />
          </div>
        </div>

        {add && <PostForm onSubmit={handleSubmit} />}

        {!isLoading && <List items={data} baseUrl={POSTS_URL} />}
      </div>
    </div>
  );
}
