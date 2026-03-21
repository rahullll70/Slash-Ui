#!/usr/bin/env node
import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { initCommand } from './commands/init.js';
import { listCommand } from './commands/list.js';
const program = new Command();
program
    .name('slash-ui')
    .description('CLI for Slash UI components')
    .version('1.0.0');
// 1. Init
program
    .command('init')
    .description('Initialize your project for Slash UI')
    .action(initCommand);
// 2. List
program
    .command('list')
    .description('List all available components')
    .action(listCommand);
// 3. Add
program
    .command('add')
    .description('Add a component to your project')
    .argument('<component>', 'the component name to add')
    .action(addCommand);
// ONLY ONE PARSE CALL AT THE VERY END
program.parse();
