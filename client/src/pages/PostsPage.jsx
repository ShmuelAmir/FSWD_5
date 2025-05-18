import { fetchPosts } from "../api/posts";
import { useQuery } from "../hooks/useQuery";
import { useDebounce } from "../hooks/useDebounce";
import PostsList from "../components/PostList";
import Button from "../components/ui/Button";
import SearchBar from "../components/SearchBar";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/Error";

export default function PostsPage() {
  const [searchValue, setSearchValue] = useDebounce("");
  const { data, error, status } = useQuery(() => fetchPosts(searchValue));

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
