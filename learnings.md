1. How to setup monorepo to have intellisense:
- create a `pnpm-workspace.yaml` <= it is NOT pural
- create a barrel file (`index.ts`) in the root of the pkg you want to export
- make sure to rename the pkg to `@tagit/shared` 
- VALIDATE all previous step were done correctly `pnpm ls -r -depth -1`
- install it into another pkg: `pnpm --filter extension i @tagit/shared --workspace` <= make sure it's not `tagit@shared` lol
- You can valide correct installation by checking the `node_modules` and the `package.json`