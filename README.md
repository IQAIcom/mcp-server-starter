# MCP Server Starter Template

A minimal starter template for building Model Context Protocol (MCP) servers using TypeScript and FastMCP.

## Features

* Basic project structure with `src/lib`, `src/services`, `src/tools`.
* Placeholder `constants.ts` and `types.ts`.
* TypeScript setup (compiles to `dist/`).
* Biome for linting and formatting.
* `fastmcp` for MCP server implementation.
* A sample "HELLO_WORLD" tool.
* `tsx` for easy development (live reload).
* GitHub Actions workflows for CI and Release (manual trigger by default).

## Getting Started

1. **Create a new repository from this template:**
   Click [here](https://github.com/new?template_name=mcp-server-starter&template_owner=IQAIcom) to generate a new repository from this template.

2. **Navigate to your new project:**

    ```bash
    cd /path/to/your-new-mcp-server
    ```

3. **Initialize Git Repository (if not already):**

    ```bash
    git init
    git branch -M main # Or your preferred default branch name
    ```

4. **Customize `package.json`:**
    * Update `name`, `version`, `description`, `author`, `repository`, etc.
    * Update the `bin` entry if you change the command name (e.g., `mcp-hello-server`).

5. **Install dependencies:**

    ```bash
    pnpm install
    ```

6. **Initial Commit:**
    It's a good idea to make an initial commit at this stage before setting up Husky and Changesets.

    ```bash
    git add .
    git commit -m "feat: initial project setup from template"
    ```

7. **Develop your server:**
    * Add your custom tools in the `src/tools/` directory.
    * Implement logic in `src/lib/` and `src/services/`.
    * Define shared items in `src/constants.ts` and `src/types.ts`.
    * Register tools in `src/index.ts`.

## Pre-commit Linting (Husky & lint-staged)

This template includes `husky` and `lint-staged` in its `devDependencies` for running Biome on staged files before committing. To set it up:

1. **Ensure Husky is executable (if needed, usually handled by pnpm/npm):**
    If you encounter issues, you might need `chmod +x .husky/*` but this is rare.

2. **Install Husky hooks:**
    The `prepare` script in `package.json` (`"prepare": "husky"`) should automatically run when you install dependencies with `pnpm install`. This sets up Husky.
    If it didn't run or you need to re-initialize:

    ```bash
    pnpm run prepare 
    # or npx husky init (less common if prepare script exists)
    ```

3. **Add the pre-commit hook for lint-staged:**

    ```bash
    pnpm exec husky add .husky/pre-commit "pnpm lint-staged"
    # or npx husky add .husky/pre-commit "pnpm lint-staged"
    ```

    This creates a `.husky/pre-commit` file that will run `pnpm lint-staged` on every commit.

4. **Configure `lint-staged` in `package.json`:**
    Add a `lint-staged` section to your `package.json` (if not already present, though the template might have a basic one to adapt):

    ```json
    // In package.json
    "lint-staged": {
      "*.{js,ts,cjs,mjs,jsx,tsx,json,jsonc}": [
        "biome check --write --organize-imports-enabled=false --no-errors-on-unmatched"
      ]
    }
    ```

    *Adjust the Biome command as needed. The one above is a common example.*

5. **Test it:**
    Stage some changes to a `.ts` file and try to commit. Biome should run on the staged file.

## Release Management (Changesets)

This template is ready for release management using [Changesets](https://github.com/changesets/changesets).

1. **Install Changesets CLI (if not already in devDependencies):**
    The template `package.json` should include `@changesets/cli`. If not:

    ```bash
    pnpm add -D @changesets/cli
    ```

2. **Initialize Changesets:**
    This command will create a `.changeset` directory with some configuration files.

    ```bash
    pnpm changeset init
    # or npx changeset init
    ```

    Commit the generated `.changeset` directory and its contents.

3. **Adding Changesets During Development:**
    When you make a change that should result in a version bump (fix, feature, breaking change):

    ```bash
    pnpm changeset add
    # or npx changeset add
    ```

    Follow the prompts. This will create a markdown file in the `.changeset` directory describing the change.
    Commit this changeset file along with your code changes.

4. **Publishing a Release:**
    The GitHub Actions workflow `release.yml` (in `mcp-server-starter/.github/workflows/`) is set up for this. When you are ready to release:
    * Ensure all feature PRs with their changeset files are merged to `main`.
    * The `release.yml` workflow (manually triggered by default in the template) will:
        1. Run `changeset version` to consume changeset files, update `package.json` versions, and update `CHANGELOG.md`. It will push these to a `changeset-release/main` branch and open a "Version Packages" PR.
        2. **Merge the "Version Packages" PR.**
        3. Upon merging, the workflow runs again on `main`. This time, it will run `pnpm run publish-packages` (which should include `changeset publish`) to publish to npm and create GitHub Releases/tags.
    * **To enable automatic release flow:** Change `on: workflow_dispatch` in `release.yml` to `on: push: branches: [main]` (or your release branch).

## Available Scripts

* `pnpm run build`: Compiles TypeScript to JavaScript in `dist/` and makes the output executable.
* `pnpm run dev`: Runs the server in development mode using `tsx` (hot-reloading for TypeScript).
* `pnpm run start`: Runs the built server (from `dist/`) using Node.
* `pnpm run lint`: Lints the codebase using Biome.
* `pnpm run format`: Formats the codebase using Biome.

## Using the Server

After building (`pnpm run build`), you can run the server:

* Directly if linked or globally installed: `mcp-hello-server` (or your customized bin name).
* Via node: `node dist/index.js`
* Via `pnpm dlx` (once published): `pnpm dlx your-published-package-name`
