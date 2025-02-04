# Block template: custom element

## Step one: copy this template

See [https://blockprotocol.org/docs/blocks/develop](https://blockprotocol.org/docs/blocks/develop)

**TL;DR:** Run `npx create-block-app@latest [your-block-name] --template=custom-element`

Other templates are available. See `npx create-block-app@latest --help`

## Step two: decide on and build the entity type for your block

A key part of the Block Protocol is the use of types to describe the data your block will work with.

Your block should be associated with an “entity type” which will be used by embedding applications
to understand what sorts of entities can be sent to it (e.g. what properties do they have?).

You can create an entity type on [blockprotocol.org](https://blockprotocol.org) — see [the docs](https://blockprotocol.org/docs/blocks/develop) for a full guide.

Once you have created the type representing the data your block needs, copy its URL for use in the next step.

## Step three: update your block's metadata

1.  Change into the folder: `cd path/to/your-block-name`

1.  Update the `blockprotocol` metadata object in package.json:

- set `blockEntityType` to the URL of the entity type you created in the previous step
- change the default `tagName` under `blockType` to the tag for your element
- optionally update additional fields which will be used to identify and describe the block when published:
  - `displayName`: a friendly display name
  - `examples`: an array of example data structures your block would accept and use
  - `image`: a preview image showing your block in action (in place of `public/block-preview.png`)
  - `icon`: an icon to be associated with your block (in place of `public/omega.svg`)
  - `name`: a slugified name for your block (which may differ to the package `name` in package.json)
    - this may either be in the format `slug` or `@namespace/slug` where `namespace` is your blockprotocol.org username

1.  Run `yarn codegen` to automatically generate TypeScript types from your block's entity type (you can modify the `codegen` field to generate code for other types as well)

## Step four: implement your block's logic and UI

This template uses the Lit custom element framework. Please see [the Lit docs](https://lit.dev/) for general help in defining an element using the framework.

1.  Write your block starting in `app.ts`. To test it during development:

    - edit `dev.tsx` to give your block starting properties

    - run the dev server with `yarn dev` (or `npm run dev`)

1.  When finished, run `yarn build` (or `npm run build`), which:

    - Bundles the component into a single source file
    - Generates a `block-metadata.json` file which:
      - points to the `schema` and `source` files
      - brings in metadata from `package.json`, such as the block name and description
      - additional brings in anything in the `blockprotocol` object in `package.json`, e.g.
        - `displayName`: a friendly display name
        - `examples`: an array of example data structures your block would accept and use
        - `image`: a preview image showing your block in action
        - `icon`: an icon to be associated with your block
        - `name`: a slugified name for your block (which may differ to the package `name` in package.json); it can be defined as `blockname` or `@namespace/blockname`, where `namespace` must be your username on blockprotocol.org if you intend to publish it there
      - lists the `externals` - libraries the block expects the host app to provide
    - Once uploaded to a remote folder, embedding applications can access `block-metadata.json` to load a block and its schema. This file is documented in full [here](https://blockprotocol.org/docs/spec).

Please see [the Block Protocol docs](https://blockprotocol.org/docs/blocks/develop)
for a fuller explanation of querying, creating and updating entity data from your block.

You can format your code using `yarn format` (or `npm run format`).

If you want to use environment variables in development, add a `.env` file in this directory, and then you can access variables defined in it via `process.env.VARIABLE_NAME`. This is useful for providing a `blockProtocolApiKey` to `MockBlockDock` in `dev.tsx`.

e.g. your `.env` file might look like this:

```text
BLOCK_PROTOCOL_API_KEY=super-secret
```

and `dev.tsx` like this:

```typescript
  return (
    <MockBlockDock
      blockProtocolApiKey={process.env.BLOCK_PROTOCOL_API_KEY}
```

## Step five: publish your block

Head over to [blockprotocol.org](https://blockprotocol.org/docs/blocks/develop#publish) to read instructions on publishing your block.

## Debugging

The component can be debugged locally by first starting `yarn dev`.

Now (using VS Code), go to the Debug tab, select "Launch Chrome" and start the debugger (F5).

You should now be able to set breakpoints and step through the code.
