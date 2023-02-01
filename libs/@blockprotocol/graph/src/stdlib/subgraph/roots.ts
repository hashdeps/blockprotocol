import {
  DataTypeRootType,
  EntityRootType,
  EntityTypeRootType,
  isEntityVertexId,
  isOntologyTypeVertexId,
  PropertyTypeRootType,
  Subgraph,
  SubgraphRootType,
} from "../../types/subgraph.js";
import { Vertex } from "../../types/subgraph/vertices.js";
import { mustBeDefined } from "../must-be-defined.js";
import { getDataTypeByVertexId } from "./element/data-type.js";
import { getEntity } from "./element/entity.js";
import { getEntityTypeByVertexId } from "./element/entity-type.js";
import { getPropertyTypeByVertexId } from "./element/property-type.js";

/**
 * Returns all root elements.
 *
 * For a narrower return type, first narrow the type of `subgraph` by using one of the helper type-guards:
 * - isSubgraph<DataTypeRootType>
 * - isSubgraph<PropertyTypeRootType>
 * - isSubgraph<EntityTypeRootType>
 * - isSubgraph<EntityRootType>
 *
 * @param subgraph
 */
export const getRoots = <RootType extends SubgraphRootType>(
  subgraph: Subgraph<RootType>,
): RootType["element"][] =>
  subgraph.roots.map((rootVertexId) => {
    const root = mustBeDefined(
      subgraph.vertices[rootVertexId.baseId]?.[
        // We could use type-guards here to convince TS that it's safe, but that would be slower, it's currently not
        // smart enough to realise this can produce a value of type `Vertex` as it struggles with discriminating
        // `EntityId` and `BaseUri`
        rootVertexId.revisionId
      ] as Vertex,
      `roots should have corresponding vertices but ${JSON.stringify(
        rootVertexId,
      )} was missing`,
    );

    return root.inner as RootType["element"];
  });

/**
 * A type-guard that can be used to constrain the generic parameter of `Subgraph` to `DataTypeWithMetadata`.
 *
 * Doing so will help TS infer that `getRoots` returns `DataTypeWithMetadata`s, removing the need for additional
 * type checks or casts.
 *
 * @param subgraph
 */
export const isDataTypeRootedSubgraph = (
  subgraph: Subgraph,
): subgraph is Subgraph<DataTypeRootType> => {
  for (const rootVertexId of subgraph.roots) {
    if (!isOntologyTypeVertexId(rootVertexId)) {
      return false;
    }

    mustBeDefined(
      getDataTypeByVertexId(subgraph, rootVertexId),
      `roots should have corresponding vertices but ${JSON.stringify(
        rootVertexId,
      )} was missing`,
    );
  }

  return true;
};

/**
 * A type-guard that can be used to constrain the generic parameter of `Subgraph` to `PropertyTypeWithMetadata`.
 *
 * Doing so will help TS infer that `getRoots` returns `PropertyTypeWithMetadata`s, removing the need for additional
 * type checks or casts.
 *
 * @param subgraph
 */
export const isPropertyTypeRootedSubgraph = (
  subgraph: Subgraph,
): subgraph is Subgraph<PropertyTypeRootType> => {
  for (const rootVertexId of subgraph.roots) {
    if (!isOntologyTypeVertexId(rootVertexId)) {
      return false;
    }

    mustBeDefined(
      getPropertyTypeByVertexId(subgraph, rootVertexId),
      `roots should have corresponding vertices but ${JSON.stringify(
        rootVertexId,
      )} was missing`,
    );
  }

  return true;
};

/**
 * A type-guard that can be used to constrain the generic parameter of `Subgraph` to `EntityTypeWithMetadata`.
 *
 * Doing so will help TS infer that `getRoots` returns `EntityTypeWithMetadata`s, removing the need for additional
 * type checks or casts.
 *
 * @param subgraph
 */
export const isEntityTypeRootedSubgraph = (
  subgraph: Subgraph,
): subgraph is Subgraph<EntityTypeRootType> => {
  for (const rootVertexId of subgraph.roots) {
    if (!isOntologyTypeVertexId(rootVertexId)) {
      return false;
    }

    mustBeDefined(
      getEntityTypeByVertexId(subgraph, rootVertexId),
      `roots should have corresponding vertices but ${JSON.stringify(
        rootVertexId,
      )} was missing`,
    );
  }

  return true;
};

/**
 * A type-guard that can be used to constrain the generic parameter of `Subgraph` to `Entity`.
 *
 * Doing so will help TS infer that `getRoots` returns `Entity`s, removing the need for additional
 * type checks or casts.
 *
 * @param subgraph
 */
export const isEntityRootedSubgraph = (
  subgraph: Subgraph,
): subgraph is Subgraph<EntityRootType> => {
  for (const rootVertexId of subgraph.roots) {
    if (!isEntityVertexId(rootVertexId)) {
      return false;
    }

    mustBeDefined(
      getEntity(subgraph, rootVertexId.baseId, rootVertexId.revisionId),
      `roots should have corresponding vertices but ${JSON.stringify(
        rootVertexId,
      )} was missing`,
    );
  }

  return true;
};
