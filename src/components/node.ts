export interface IFixtureTreeNode {
  name: string;
  path?: string;
  key?: string;
  children?: IFixtureTreeNode[];
}
