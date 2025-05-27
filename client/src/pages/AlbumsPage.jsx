import { useState } from "react";

import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "../hooks/useQuery";
import { ALBUMS_URL, createAlbum, getAlbumsUrl } from "../api/albums";
import { useAuth } from "../hooks/useAuth";
import ErrorMessage from "../components/ui/ErrorMessage";
import SearchBar from "../components/SearchBar";
import List from "../components/List";
import Button from "../components/ui/Button";
import AlbumForm from "../components/AlbumForm";

export default function AlbumsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [add, setAdd] = useState(false);

  const { userId } = useAuth();
  const debouncedValue = useDebounce(searchValue);
  const { data, error, isLoading, refetch } = useQuery(
    getAlbumsUrl(userId, debouncedValue),
    !userId
  );

  if (error) {
    return <ErrorMessage />;
  }

  const handleSubmit = async (title) => {
    await createAlbum({ userId, title });
    setAdd(false);
    refetch();
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">Albums</h2>
          <div className="page-actions">
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <Button
              text="Toggle album form"
              handleClick={() => setAdd((p) => !p)}
              className={add ? "btn-secondary" : "btn-primary"}
            />
          </div>
        </div>

        {add && <AlbumForm onSubmit={handleSubmit} />}

        {!isLoading && <List items={data} baseUrl={ALBUMS_URL} />}
      </div>
    </div>
  );
}
