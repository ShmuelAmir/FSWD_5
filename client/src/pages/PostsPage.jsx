import { useState } from "react";

import { createPost, getPostsUrl } from "../api/posts";
import { useQuery } from "../hooks/useQuery";
import { useDebounce } from "../hooks/useDebounce";
import { useAuth } from "../hooks/useAuth";
import PostsList from "../components/PostList";
import Button from "../components/ui/Button";
import SearchBar from "../components/SearchBar";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import PostForm from "../components/PostForm";

export default function PostsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [add, setAdd] = useState(false);

  const { userId } = useAuth();
  const debouncedValue = useDebounce(searchValue);
  const { data, error, isLoading } = useQuery(
    getPostsUrl(userId, debouncedValue),
    !userId
  );

  // TODO: move down to prevent flickring
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  const handleSubmit = (title, body) => {
    createPost({ userId, title, body });
    setAdd(false);
  };

  return (
    <div>
      <h2>Posts</h2>
      <div>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <Button text="Add Post" handleClick={() => setAdd(true)} />
      </div>
      {add && <PostForm onSubmit={handleSubmit} />}
      <PostsList posts={data} />
    </div>
  );
}
