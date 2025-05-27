import { useState } from "react";

import { getAlbumPhotosUrl, PAGE_SIZE } from "../api/albums";
import { useQuery } from "../hooks/useQuery";
import ErrorMessage from "./ui/ErrorMessage";
import Loader from "./ui/Loader";
import Button from "./ui/Button";
import Photo from "./Photo";

export default function Photos({ albumId }) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, refetch } = useQuery(
    getAlbumPhotosUrl(albumId, page),
    !albumId
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {data?.items?.map((photo) => (
          <Photo key={photo.id} photo={photo} refetch={refetch} />
        ))}
      </div>
      {data?.total !== 0 && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Button
            handleClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            text={"←"}
          />
          <span style={{ padding: "0.5rem" }}>Page {page}</span>
          <Button
            disabled={page * PAGE_SIZE >= data?.total}
            handleClick={() => setPage((p) => p + 1)}
            text="→"
          />
        </div>
      )}
    </div>
  );
}
