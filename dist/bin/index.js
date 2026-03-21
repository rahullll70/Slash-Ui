#!/usr/bin/env node
import { Command } from 'commander';
import { addCommand } from '../src/commands/add.js';
import { listCommand } from '../src/commands/list.js';
import { initCommand } from '../src/commands/init.js'; // 1. Import your new initCommand
const program = new Command();
program
    .name('slash-ui')
    .description('CLI for Slash-UI component library')
    .version('1.2.9'); // 2. Bump version for the new release
// 3. Register the 'init' command
program
    .command('init')
    .description('Initialize your project for Slash UI')
    .action(initCommand);
// Register the 'add' command
program
    .command('add')
    .description('Add a component to your project')
    .argument('<component>', 'the component to add')
    .action(addCommand);
// Register the 'list' command
program
    .command('list')
    .description('List all available components')
    .action(listCommand);
program.parse();
