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
import { promisify } from "util";
import { exec as execCallback } from "child_process";
import { fileURLToPath } from "url";
const exec = promisify(execCallback);
const createDayFolder = (dayFolderPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs.mkdir(dayFolderPath, { recursive: true });
        console.log(`Day ${dayFolderPath} folder created.`);
    }
    catch (error) {
        throw new Error(`Error creating folder: ${error}`);
    }
});
const initializeNodeProject = (dayFolderPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exec(`cd ${dayFolderPath} && npm init -y`);
        console.log(`Node.js project initialized in ${dayFolderPath}`);
    }
    catch (error) {
        throw new Error(`Error initializing Node.js project: ${error}`);
    }
});
const copyTemplate = (templatePath, destinationPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const template = yield fs.readFile(templatePath, "utf8");
        yield fs.writeFile(destinationPath, template);
        console.log(`${templatePath} template has been copied into ${destinationPath}`);
    }
    catch (error) {
        throw new Error(`Error copying template: ${error}`);
    }
});
const createDay = () => __awaiter(void 0, void 0, void 0, function* () {
    const { day } = yield inquirer.prompt([
        {
            type: "input",
            name: "day",
            message: "Enter number for the day to create:",
            validate: (input) => /^\d+$/.test(input) || "Please enter a valid number.",
        },
    ]);
    const currentWorkingDir = process.cwd();
    const templateDir = path.dirname(fileURLToPath(import.meta.url));
    const dayFolderPath = path.join(currentWorkingDir, `day-${day}`);
    const parseFilePath = path.join(dayFolderPath, `utils.js`);
    const parseTemplatePath = path.resolve(templateDir, "../templates/parseTemplate.js");
    const dayFilePath = path.join(dayFolderPath, "part-01.js");
    const dayTemplatePath = path.resolve(templateDir, "../templates/dayTemplate.js");
    try {
        // Create the folder
        yield createDayFolder(dayFolderPath);
        // Read and write the parse template
        yield copyTemplate(parseTemplatePath, parseFilePath);
        // Read and write the day template
        yield copyTemplate(dayTemplatePath, dayFilePath);
        // Initialize Node.js project inside the created folder
        yield initializeNodeProject(dayFolderPath);
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