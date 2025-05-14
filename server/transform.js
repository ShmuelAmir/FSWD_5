const fs = require("node:fs/promises");
const path = require("node:path");

async function transformPhotos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    let photos = await response.json();

    // Limit to the first 200 photos
    photos = photos.slice(0, 200);

    // Transform the photos
    const transformedPhotos = photos.map((photo, index) => {
      const albumId = Math.floor(index / 2) + 1; // 2 photos per album
      const width = 600;
      const height = 400;

      return {
        ...photo,
        albumId: albumId,
        url: `https://picsum.photos/id/${photo.id}/${width}/${height}`,
        thumbnailUrl: `https://picsum.photos/id/${photo.id}/150/150`,
      };
    });

    // Write the transformed data to a JSON file
    const outputPath = path.join(__dirname, "transformed_photos.json");
    await fs.writeFile(
      outputPath,
      JSON.stringify(transformedPhotos, null, 2),
      "utf-8"
    );

    console.log(`Successfully transformed and saved data to ${outputPath}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

transformPhotos();
