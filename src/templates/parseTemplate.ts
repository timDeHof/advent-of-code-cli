import { promises as fs } from "fs";

async function readFile(file: string) {
  try {
    const data = await fs.readFile(file, "utf-8");
    return data.split("\n");
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      if ((error as NodeJS.ErrnoException).code === "EEXIST") {
        console.error(`parse file already exists.`);
      } else {
        console.error(`An error occurred while creating parse file:`, error);
      }
      console.error("Error reading file:", error.message);
      throw error;
    }
  }
}
export default readFile;
