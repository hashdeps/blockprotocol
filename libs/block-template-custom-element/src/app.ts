import { BlockElementBase } from "@blockprotocol/graph/custom-element";
import { css, html } from "lit";

import { BlockEntity } from "./types/generated/block-entity";

const nameKey: keyof BlockEntity["properties"] =
  "https://blockprotocol.org/@blockprotocol/types/property-type/name/";

/**
 * This is the entry point for your block – the class that embedding applications will use to register your element.
 * You should update this comment to describe what your block does, or remove the comment.
 * This uses the Lit framework as a base - @see https://lit.dev
 * It makes two special Block Protocol properties available:
 * 1. 'graph': contains properties representing messages sent from the embedding application to the block, e.g. 'blockEntitySubgraph'
 * 2. 'graphModule': has various methods you can use to send messages to the embedding application, e.g. 'updateEntity'
 */
export class BlockElement extends BlockElementBase<BlockEntity> {
  /** @see https://lit.dev/docs/components/styles */
  static styles = css`
    font-family: sans-serif;
  `;

  private handleInput(event: InputEvent) {
    if (!this.graphModule) {
      return;
    }
    /**
     * This is an example of using the graph module to send a message to the embedding application
     * – this particular message asks the application update an entity's properties.
     * The specific entity to update is identified by 'entityId'
     * – we are passing the 'entityId' of the entity loaded into the block (graph.blockEntity').
     *
     * Many other messages are available for your block to read and update entities, and links between entities
     * @see https://blockprotocol.org/docs/spec/graph-module#message-definitions
     */
    this.graphModule
      .updateEntity<BlockEntity["properties"]>({
        data: {
          entityId: this.getBlockEntity().metadata.recordId.entityId,
          entityTypeId: this.getBlockEntity().metadata.entityTypeId,
          properties: {
            ...this.getBlockEntity().properties,
            [nameKey]: (event.target as HTMLInputElement).value,
          },
        },
      })
      .catch((error) => console.error(`Error updating self: ${error}`));
  }

  /** @see https://lit.dev/docs/components/rendering */
  render() {
    return html`<h1>Hello, ${this.getBlockEntity().properties[nameKey]}</h1>
      <p>
        The entityId of this block is
        ${this.getBlockEntity().metadata.recordId.entityId}. Use it to update
        its data when calling updateEntity.
      </p>
      <!-- @see https://lit.dev/docs/components/events -->
      <input
        @change=${this.handleInput}
        value=${this.getBlockEntity().properties[nameKey]}
      />`;
  }
}
