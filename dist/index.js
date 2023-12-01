#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
console.log(chalk.green(figlet.textSync("advent of code")));
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const choices = [
            { name: "List advent of code days", value: "list" },
            { name: "create a new day", value: "create-day" },
            { name: "exit", value: "exit" },
        ];
        const { command } = yield inquirer.prompt([
            {
                type: "list",
                name: "command",
                message: "Choose a command:",
                choices: choices,
            },
        ]);
        return command;
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let command = yield mainMenu();
            switch (command) {
                case "list":
                    const listDaysContents = (yield import("./commands/listDaysContents.js")).default;
                    yield listDaysContents();
                    break;
                case "create-day":
                    const createDay = (yield import("./commands/createDay.js")).default;
                    yield createDay();
                    break;
                case "exit":
                    console.log("Exiting...");
                    return;
                default:
                    console.log("Invalid command.");
                    break;
            }
            yield run();
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
run();
//# sourceMappingURL=index.js.map