var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs/promises";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
const createDay = () => __awaiter(void 0, void 0, void 0, function* () {
    const { day } = yield inquirer.prompt([
        {
            type: "input",
            name: "day",
            message: "Enter number for the day to create:",
            validate: (input) => /^\d+$/.test(input) || "Please enter a valid number.",
        },
    ]);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dayFolderPath = path.join(__dirname, `../../src/days/day-${day}`);
    const dayFilePath = path.join(dayFolderPath, `day${day}.ts`);
    const templatePath = path.join(__dirname, "../../src/templates/dayTemplate.ts");
    // Check if the folder already exists
    try {
        // Create the folder
        yield fs.mkdir(dayFolderPath, { recursive: true });
        const template = yield fs.readFile(templatePath, "utf8");
        // Replace the placeholder with the actual day number
        const dayFileContent = template.replace(/{{DAY_NUMBER}}/g, day.toString());
        yield fs.writeFile(dayFilePath, dayFileContent);
        console.log(`Day ${day} folder and file created.`);
    }
    catch (error) {
        // Check if error has a property 'code'
        if (error instanceof Error && "code" in error) {
            if (error.code === "EEXIST") {
                console.error(`Day ${day} already exists.`);
            }
            else {
                console.error(`An error occurred while creating Day ${day}:`, error);
            }
        }
        else {
            console.error(`An unexpected error occurred:`, error);
        }
    }
});
export default createDay;
//# sourceMappingURL=createDay.js.map