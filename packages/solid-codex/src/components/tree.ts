import type { Component } from 'solid-js';
import type { IFixture } from '../data/fixtures';

export interface IFixtureTreeNode {
  title: string;
  fixture?: IFixture;
  children?: IFixtureTreeNode[];
  component?: Component;
  category: string[];
}

export interface IFixtureTree {
  children?: IFixtureTreeNode[];
  byId: Record<string, IFixtureTreeNode>;
}
