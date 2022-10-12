import { IFixture } from "../fetchFixtures";

export interface IFixtureTreeNode {
  title: string;
  fixture?: IFixture;
  children?: IFixtureTreeNode[];
}

export interface IFixtureTree {
  children?: IFixtureTreeNode[];
  byId: Record<string, IFixtureTreeNode>;
}
