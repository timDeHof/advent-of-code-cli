import fs from "fs/promises";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";

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

  const dayFolderPath = path.join(__dirname, `../../src/days/day-${day}`);
  const dayFilePath = path.join(dayFolderPath, `day${day}.ts`);
  const templatePath = path.join(
    __dirname,
    "../../src/templates/dayTemplate.ts",
  );
  // Check if the folder already exists
  try {
    // Create the folder
    await fs.mkdir(dayFolderPath, { recursive: true });

    const template = await fs.readFile(templatePath, "utf8");
    // Replace the placeholder with the actual day number
    const dayFileContent = template.replace(/{{DAY_NUMBER}}/g, day.toString());
    await fs.writeFile(dayFilePath, dayFileContent);

    console.log(`Day ${day} folder and file created.`);
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
