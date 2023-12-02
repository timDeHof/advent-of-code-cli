import fs from "fs/promises";
import path from "path";
import inquirer from "inquirer";
import { promisify } from "util";
import { exec as execCallback } from "child_process";
import { fileURLToPath } from "url";

const exec = promisify(execCallback);

const createDayFolder = async (dayFolderPath: string) => {
  try {
    await fs.mkdir(dayFolderPath, { recursive: true });
    console.log(`Day ${dayFolderPath} folder created.`);
  } catch (error) {
    throw new Error(`Error creating folder: ${error}`);
  }
};

const initializeNodeProject = async (dayFolderPath: string) => {
  try {
    await exec(`cd ${dayFolderPath} && npm init -y`);
    console.log(`Node.js project initialized in ${dayFolderPath}`);
  } catch (error) {
    throw new Error(`Error initializing Node.js project: ${error}`);
  }
};

const copyTemplate = async (templatePath: string, destinationPath: string) => {
  try {
    const template = await fs.readFile(templatePath, "utf8");
    await fs.writeFile(destinationPath, template);
    console.log(
      `${templatePath} template has been copied into ${destinationPath}`,
    );
  } catch (error) {
    throw new Error(`Error copying template: ${error}`);
  }
};

const createDay = async () => {
  const { day } = await inquirer.prompt([
    {
      type: "input",
      name: "day",
      message: "Enter number for the day to create:",
      validate: (input) =>
        /^\d+$/.test(input) || "Please enter a valid number.",
    },
  ]);

  const currentWorkingDir = process.cwd();
  const templateDir = path.dirname(fileURLToPath(import.meta.url));
  const dayFolderPath = path.join(currentWorkingDir, `day-${day}`);
  const parseFilePath = path.join(dayFolderPath, `utils.js`);
  const parseTemplatePath = path.resolve(
    templateDir,
    "../templates/parseTemplate.js",
  );
  const dayFilePath = path.join(dayFolderPath, "part-01.js");
  const dayTemplatePath = path.resolve(
    templateDir,
    "../templates/dayTemplate.js",
  );

  try {
    // Create the folder
    await createDayFolder(dayFolderPath);
    // Read and write the parse template
    await copyTemplate(parseTemplatePath, parseFilePath);
    // Read and write the day template
    await copyTemplate(dayTemplatePath, dayFilePath);

    // Initialize Node.js project inside the created folder
    await initializeNodeProject(dayFolderPath);
  } catch (error: unknown) {
    // Check if error has a property 'code'
    if (error instanceof Error && "code" in error) {
      if ((error as NodeJS.ErrnoException).code === "EEXIST") {
        console.error(`Day ${day} already exists.`);
      } else {
        console.error(`An error occurred while creating Day ${day}:`, error);
      }
    } else {
      console.error(`An unexpected error occurred:`, error);
    }
  }
};

export default createDay;
