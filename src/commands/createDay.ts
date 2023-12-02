import fs from "fs/promises";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { exec } from "child_process";

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
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const dayFolderPath = path.join(__dirname, `../day-${day}`);
  const parseFilePath = path.join(dayFolderPath, `utils.js`);
  const parseTemplatePath = path.join(
    __dirname,
    "../../src/templates/parseTemplate.ts",
  );
  const dayFilePath = path.join(dayFolderPath, "part-01.js");
  const dayTemplatePath = path.basename(
    __dirname,
    "../../src/templates/dayTemplate.ts",
  );

  try {
    // Create the folder
    await fs.mkdir(dayFolderPath, { recursive: true });
    const template = await fs.readFile(parseTemplatePath, "utf8");
    await fs.writeFile(parseFilePath, template);
    const dayTemplate = await fs.readFile(dayTemplatePath, "utf8");
    await fs.writeFile(dayFilePath, dayTemplate);

    console.log(`Day ${day} folder and file created.`);

    // Initialize Node.js project inside the created folder
    exec(`cd ${dayFolderPath} && npm init -y`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error initializing Node.js project: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Node.js project initialized in day-${day} folder`);
      console.log(stdout);
    });
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
