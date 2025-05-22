import { useCallback, useState } from "react";

import { fetchPosts } from "../api/posts";
import { useQuery } from "../hooks/useQuery";
import { useDebounce } from "../hooks/useDebounce";
import PostsList from "../components/PostList";
import Button from "../components/ui/Button";
import SearchBar from "../components/SearchBar";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function PostsPage() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue);

  const fetchFunction = useCallback(
    () => fetchPosts(debouncedValue),
    [debouncedValue]
  );
  const { data, error, status } = useQuery(fetchFunction);

  // TODO: move down to prevent flickring
  if (status === "loading") {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div>
      <h2>Posts</h2>
      <div>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        {/* navigate to create post page */}
        <Button text="Add Post" />
      </div>
      <PostsList posts={data} />
    </div>
  );
}
