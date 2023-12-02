var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import { fileURLToPath } from "url";
function listDaysContents() {
    return __awaiter(this, void 0, void 0, function* () {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const directoryPath = path.resolve(__dirname, "../days");
        const spinner = ora("Listing days contents").start();
        console.log("\n");
        try {
            const files = yield fs.promises.readdir(directoryPath);
            const detailedFilesPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                let fileDetails = yield fs.promises.lstat(path.resolve(directoryPath, file));
                const { size, birthtime } = fileDetails;
                return {
                    "filename": file,
                    "size(kb)": size / 1024,
                    "created_at": birthtime,
                };
            }));
            const detailedFiles = yield Promise.all(detailedFilesPromises);
            console.table(detailedFiles);
            spinner.succeed("Days listed");
        }
        catch (error) {
            spinner.fail("Error occurred while reading the directory");
            // Check if error is an instance of Error and has a message property
            if (error instanceof Error && typeof error.message === "string") {
                console.error(chalk.red(error.message));
            }
            else {
                // Handle cases where the error is not an Error object
                console.error(chalk.red("An unexpected error occurred"));
            }
        }
    });
}
export default listDaysContents;
//# sourceMappingURL=listDaysContents.js.map