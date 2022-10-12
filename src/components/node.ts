import { Component } from "solid-js";
import { IFixture } from "../fetchFixtures";

export interface IFixtureTreeNode {
  title: string;
  fixture?: IFixture;
  children?: IFixtureTreeNode[];
  component?: Component;
}

export interface IFixtureTree {
  children?: IFixtureTreeNode[];
  byId: Record<string, IFixtureTreeNode>;
}
