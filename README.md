# Advent of Code CLI Tool

This CLI tool is designed to assist in managing and solving challenges for the
[Advent of Code](https://adventofcode.com/) - an annual set of Christmas-themed
programming puzzles. It streamlines the process of setting up and organizing the
challenges, making it easier to focus on solving them.

## Features

- **Day Initialization**: Automatically creates a new folder and a template file
  for each day's challenge, helping you to quickly start coding your solution.
- **List Days Contents**: Lists the contents of the current working directory
  with details like file size and creation date.

## Getting Started

### Prerequisites

- Ensure that Node.js is installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:timDeHof/advent-of-code-cli.git
   ```
2. Navigate to the project directory:
   ```bash
   cd advent-of-code-cli
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

4. To use the tool

   ```bash
   npm run start
   ```

Follow the prompts to enter the day number. This will create a new folder for
the specified day with a pre-populated template file.

## Customization

The template used for each day's challenge can be modified by editing the
`dayTemplate.ts` file in the templates directory. Feel free to add additional
commands and features to the CLI as per your requirements.

## Contributing

Contributions to this project are welcome. If you have ideas for new features or
improvements, please feel free to fork the repository and submit a pull request.

## License

MIT

## Acknowledgments

Special thanks to the Advent of Code for providing engaging and challenging
programming puzzles each year.
