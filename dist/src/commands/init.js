import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
export const initCommand = async () => {
    try {
        console.log(chalk.bold.blue('\n🚀 Initializing Slash UI...\n'));
        const response = await prompts([
            {
                type: 'text',
                name: 'componentsPath',
                message: 'Where would you like to install your components?',
                initial: 'components/ui',
            },
            {
                type: 'confirm',
                name: 'proceed',
                message: 'This will create directories and neubrutal configurations. Proceed?',
                initial: true,
            },
        ]);
        if (!response.proceed) {
            console.log(chalk.yellow('Aborted initialization.'));
            return;
        }
        // 1. Create Directories
        const targetDir = path.join(process.cwd(), response.componentsPath);
        const utilsDir = path.join(process.cwd(), "lib");
        await fs.ensureDir(targetDir);
        await fs.ensureDir(utilsDir);
        console.log(chalk.green(`✔ Created directories.`));
        // 2. Create lib/utils.ts (CRITICAL for your components)
        const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
        await fs.writeFile(path.join(utilsDir, "utils.ts"), utilsContent);
        console.log(chalk.green('✔ Created lib/utils.ts'));
        // 3. Create components.json
        const config = {
            style: 'default',
            tailwind: {
                config: 'tailwind.config.ts',
                css: 'app/globals.css',
                baseColor: 'zinc',
            },
            paths: {
                components: response.componentsPath,
                utils: 'lib/utils',
            },
        };
        await fs.writeJSON(path.join(process.cwd(), 'components.json'), config, { spaces: 2 });
        console.log(chalk.green('✔ Created components.json'));
        // 4. Advanced Tailwind Config Injection
        const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.ts');
        if (fs.existsSync(tailwindConfigPath)) {
            let content = fs.readFileSync(tailwindConfigPath, 'utf-8');
            // Add Neubrutal Theme extensions if they don't exist
            if (!content.includes('boxShadow')) {
                const neubrutalTheme = `
      extend: {
        boxShadow: {
          'neubrutal': '4px 4px 0px 0px rgba(0,0,0,1)',
          'neubrutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        },
        borderWidth: {
          '3': '3px',
        },
      },`;
                // This is a simple regex to inject into the theme object
                content = content.replace(/theme: \{([\s\S]*?)(\s*)\}/, `theme: {$1 ${neubrutalTheme}$2}`);
            }
            // Add the content path
            if (!content.includes(response.componentsPath)) {
                content = content.replace(/content: \[([\s\S]*?)\]/, `content: [$1, "./${response.componentsPath}/**/*.{ts,tsx}"]`);
            }
            fs.writeFileSync(tailwindConfigPath, content);
            console.log(chalk.dim('✔ Injected neubrutal theme into tailwind.config.ts'));
        }
        console.log(chalk.bgCyan.black("\n SUCCESS ") + " Project initialized. Ready to add components!");
    }
    catch (error) {
        console.error(chalk.red('\nFailed to initialize project:'), error);
    }
};
