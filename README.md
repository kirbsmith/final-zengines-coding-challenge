# Zengines Hacker News

Vue 2 had a couple of [Hacker News clones](https://github.com/vuejs/vue-hackernews-2.0) to get people comfortable with the framework. Those clones haven't been duplicated in Vue 3 so your challenge is to create one. We're not looking for a feature-complete version of Hacker News. Instead, we'd like a simple UI that does the following:

- use the official [Hacker News API](https://github.com/HackerNews/API)
- show a list of the 50 **top** stories
- please style it in any way you think is esthetically pleasing. This project is using the latest version of Tailwind CSS. You can use that or the CSS framework of your choice.
- allow the user to click on an individual item and redirect to a detail page
- the detail page should include a list of the comments associated with the item

## Next Steps

- please clone this repo to your local environment
- cd into the new folder
- run `npm install` to install all of the dependencies
- run `npm run dev` to view the project in a browser
- once you've completed the requirements, please upload the project into your GitHub account and send the link to Dave Fravel

## Questions

If you have any questions or run into a wall, please reach out to Dave Fravel at anytime. There isn't a set amount of time for this project. Please take as much or as little time as you'd like.

## Template Information

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
