import { useState } from "react";
import { useParams } from "react-router";

import { useQuery } from "../hooks/useQuery";
import { getAlbumUrl } from "../api/albums";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import Photos from "../components/Photos";
import { createPhoto } from "../api/photos";
import Button from "../components/ui/Button";
import PhotoForm from "../components/PhotoForm";

export default function AlbomPage() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQuery(getAlbumUrl(id), !id);
  const [add, setAdd] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleSubmit = async (title, url) => {
    await createPhoto({ albumId: id, title, url });
    setAdd(false);
    refetch();
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h2>{data?.title}</h2>
          <div className="page-actions">
            <Button
              text="Toggle photo form"
              handleClick={() => setAdd((p) => !p)}
              className={add ? "btn-secondary" : "btn-primary"}
            />
          </div>

          {add && <PhotoForm onSubmit={handleSubmit} />}
        </div>
        <Photos albumId={data?.id} />
      </div>
    </div>
  );
}
