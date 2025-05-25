const fs = require("node:fs/promises");
const path = require("node:path");

async function transformComments() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    let comments = await response.json();

    // Transform the comments
    const transformedComments = comments.map((comment) => {
      // Generate random userId between 1 and 10 (inclusive)
      const userId = Math.floor(Math.random() * 10) + 1;

      return {
        ...comment,
        userId: userId,
      };
    });

    // Write the transformed data to a JSON file
    const outputPath = path.join(__dirname, "transformed_comments.json");
    await fs.writeFile(
      outputPath,
      JSON.stringify(transformedComments, null, 2),
      "utf-8"
    );

    console.log(`Successfully transformed and saved comments to ${outputPath}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

transformComments();
