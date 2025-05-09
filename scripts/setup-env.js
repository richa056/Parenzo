const fs = require('fs');
const path = require('path');

// Check if env.config.ts exists
const envConfigPath = path.join(process.cwd(), 'env.config.ts');
if (fs.existsSync(envConfigPath)) {
  console.log('env.config.ts already exists. Please remove it first if you want to create a new one.');
  process.exit(1);
}

// Read the example file
const examplePath = path.join(process.cwd(), 'env.config.example.ts');
const exampleContent = fs.readFileSync(examplePath, 'utf8');

// Create the new env.config.ts file
fs.writeFileSync(envConfigPath, exampleContent);

console.log('Created env.config.ts from env.config.example.ts');
console.log('Please update the values in env.config.ts with your actual configuration.'); 