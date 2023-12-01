#!/usr/bin/env node

import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";

console.log(chalk.green(figlet.textSync("advent of code")));

interface MainMenuResponse {
  command: string;
}

async function mainMenu(): Promise<string> {
  const choices = [
    { name: "List advent of code days", value: "list" },
    { name: "create a new day", value: "create-day" },
    { name: "exit", value: "exit" },
  ];

  const { command }: MainMenuResponse = await inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: "Choose a command:",
      choices: choices,
    },
  ]);
  return command;
}

async function run() {
  try {
    let command = await mainMenu();

    switch (command) {
      case "list":
        const listDaysContents = (
          await import("./commands/listDaysContents.js")
        ).default;
        await listDaysContents();
        break;
      case "create-day":
        const createDay = (await import("./commands/createDay.js")).default;
        await createDay();
        break;
      case "exit":
        console.log("Exiting...");
        return;
      default:
        console.log("Invalid command.");
        break;
    }
    await run();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

run();
