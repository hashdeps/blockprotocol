import { MockBlockDock } from "mock-block-dock";
import { createRoot } from "react-dom/client";

import packageJson from "../package.json";
import Component from "./index";
import { BlockEntity } from "./types/generated/block-entity";

const node = document.getElementById("app");

const testEntity: BlockEntity = {
  metadata: {
    recordId: {
      entityId: "test-entity",
      editionId: new Date().toISOString(),
    },
    entityTypeId:
      "https://blockprotocol.org/@blockprotocol/types/entity-type/thing/v/2",
  },
  properties: {
    "https://blockprotocol.org/@blockprotocol/types/property-type/name/":
      "World",
  },
} as const;

/**
 * This is an embedding application for local development and debugging.
 * It is the application loaded into the browser when you run 'yarn dev' (or 'npm run dev')
 * No data from it will be published with your block or included as part of a production build.
 *
 * The component used here, 'MockBlockDock', does the following:
 * 1. It renders your block on the page and provides the initial properties specified below
 * 2. It holds an in-memory datastore of entities and links
 * 3. It listens for messages from your blocks and updates its datastore appropriately (e.g. to create a new entity)
 * 4. It displays a debug UI allowing you to see the contents of its datastore, and messages sent back and forth
 */
const DevApp = () => {
  return (
    <MockBlockDock
      blockDefinition={{ ReactComponent: Component }}
      blockEntityRecordId={testEntity.metadata.recordId}
      blockInfo={packageJson.blockprotocol}
      debug // remove this to start with the debug UI minimised. You can also toggle it in the UI
      initialData={{
        initialEntities: [testEntity],
      }}
      simulateDatastoreLatency={{
        // configure this to adjust the range of artificial latency in responses to datastore-related requests (in ms)
        min: 50,
        max: 200,
      }}
      includeDefaultMockData // this seeds the datastore with sample entities and links, remove this to start with just the contents of `initialData`
      // hideDebugToggle <- uncomment this to disable the debug UI entirely
      // initialEntities={[]} <- customise the entities in the datastore (blockEntity is always added, if you provide it)
      // initialEntityTypes={[]} <- customise the entity types in the datastore
      // initialLinks={[]} <- customise the links in the datastore
      // initialLinkedQueries={[]} <- customise the linkedQueries in the datastore
      // readonly <- uncomment this to start your block in readonly mode. You can also toggle it in the UI
    />
  );
};

if (node) {
  createRoot(node).render(<DevApp />);
} else {
  throw new Error("Unable to find DOM element with id 'app'");
}
