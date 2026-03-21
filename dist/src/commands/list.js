import chalk from "chalk";
import prompts from "prompts";
import { Index } from "../../__registry__/index.js";
import { addCommand } from "./add.js";
export const listCommand = async () => {
    try {
        const registryData = Index.default;
        const components = Object.keys(registryData);
        if (components.length === 0) {
            console.log(chalk.red("\n✖ No components found. Run 'npm run build:registry' first."));
            return;
        }
        // 1. Create the interactive menu choices
        const choices = components.map((name) => ({
            title: name,
            value: name,
            description: chalk.dim(registryData[name].category || "ui"),
        }));
        console.log(chalk.bold.cyan("\n─── Slash UI Explorer ───"));
        // 2. Launch the autocomplete search menu
        const response = await prompts({
            type: "autocomplete",
            name: "selected",
            message: "Search components",
            choices: choices,
            // This allows filtering as you type
            suggest: (input, choices) => Promise.resolve(choices.filter(i => i.title.toLowerCase().includes(input.toLowerCase()))),
        });
        // 3. If they select one, run the add command immediately
        if (response.selected) {
            await addCommand(response.selected);
        }
    }
    catch (error) {
        console.error(chalk.red("\nFailed to display component list:"), error);
    }
};
