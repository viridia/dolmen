export interface IFixtureTreeNode {
  name: string;
  path?: string;
  urlPath?: string;
  propertyKey?: string;
  children?: IFixtureTreeNode[];
}

export interface IFixtureTree {
  children?: IFixtureTreeNode[];
  byId: Record<string, IFixtureTreeNode>;
}
