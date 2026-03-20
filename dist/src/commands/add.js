import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import prompts from "prompts";
import { execSync } from "child_process";
// Import the Index that YOUR script just generated
import { Index } from "../../__registry__/index.js";
/**
 * Helper to check and install missing peer dependencies
 */
async function installMissingDeps(dependenciesString) {
    try {
        const packageJsonPath = path.join(process.cwd(), "package.json");
        if (!await fs.pathExists(packageJsonPath))
            return;
        const packageJson = await fs.readJSON(packageJsonPath);
        const allDeps = Object.assign(Object.assign({}, packageJson.dependencies), packageJson.devDependencies);
        // Split the space-separated string from your registry (e.g., "framer-motion lucide-react")
        const requiredDeps = dependenciesString.split(" ");
        const missing = requiredDeps.filter(dep => !allDeps[dep]);
        if (missing.length > 0) {
            console.log(chalk.yellow(`\nMissing dependencies: ${chalk.bold(missing.join(", "))}`));
            const { confirm } = await prompts({
                type: "confirm",
                name: "confirm",
                message: "Would you like to install them now?",
                initial: true
            });
            if (confirm) {
                console.log(chalk.cyan("Installing..."));
                // 'stdio: inherit' lets the user see the npm progress bar
                execSync(`npm install ${missing.join(" ")}`, { stdio: "inherit" });
                console.log(chalk.green("Dependencies installed.\n"));
            }
        }
    }
    catch (error) {
        console.error(chalk.red("Could not check/install dependencies:"), error);
    }
}
export const addCommand = async (componentName) => {
    try {
        const component = Index.default[componentName];
        if (!component) {
            console.error(chalk.red(`\nError: Component "${componentName}" not found in registry.`));
            return;
        }
        const targetDir = path.join(process.cwd(), "components", "ui");
        await fs.ensureDir(targetDir);
        const fileName = component.files[0] ? path.basename(component.files[0]) : `${componentName}.tsx`;
        const filePath = path.join(targetDir, fileName);
        await fs.writeFile(filePath, component.content);
        // --- Premium Success Message ---
        console.log(`\n${chalk.bgCyan.black(" DONE ")} ${chalk.green(`Component ${chalk.bold(componentName)} has been added.`)}`);
        console.log(`${chalk.dim("Location:")} ${chalk.cyan(filePath)}`);
        // --- Automated Dependency Check ---
        if (component.install) {
            await installMissingDeps(component.install);
        }
    }
    catch (error) {
        console.error(chalk.red("\nFailed to add component:"), error);
    }
};
