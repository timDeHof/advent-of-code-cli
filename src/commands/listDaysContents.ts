import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";

async function listDaysContents() {
  const currentWorkingDir = process.cwd();
  const spinner = ora("Listing days contents").start();
  console.log("\n");
  try {
    const files = await fs.promises.readdir(currentWorkingDir);
    const detailedFilesPromises = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(
        path.resolve(currentWorkingDir, file),
      );
      const { size, birthtime } = fileDetails;
      return {
        "filename": file,
        "size(kb)": size / 1024,
        "created_at": birthtime,
      };
    });
    const detailedFiles = await Promise.all(detailedFilesPromises);

    console.table(detailedFiles);
    spinner.succeed("Days listed");
  } catch (error: unknown) {
    spinner.fail("Error occurred while reading the directory");
    // Check if error is an instance of Error and has a message property
    if (error instanceof Error && typeof error.message === "string") {
      console.error(chalk.red(error.message));
    } else {
      // Handle cases where the error is not an Error object
      console.error(chalk.red("An unexpected error occurred"));
    }
  }
}

export default listDaysContents;
