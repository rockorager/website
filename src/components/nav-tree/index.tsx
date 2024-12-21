import classNames from "classnames";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import s from "./NavTree.module.css";
import Link from "../link";

export type NavTreeNode = FolderNode | LinkNode | BreakNode;

export type FolderNode = {
  type: "folder";
  title: string;
  path: string;
  open?: boolean;
  children: NavTreeNode[];
};

export type LinkNode = {
  type: "link";
  title: string;
  path: string;
  active?: boolean;
};

export type BreakNode = {
  type: "break";
};

interface NavTreeNodeGroup {
  rootPath: string;
  nodes: NavTreeNode[];
}

interface NavTreeProps {
  className?: string;
  nodeGroups: NavTreeNodeGroup[];
}

export default function NavTree({ className, nodeGroups }: NavTreeProps) {
  return (
    <div className={classNames(s.navTree, className)}>
      {nodeGroups.map(({ rootPath, nodes }) => {
        return <NavTreeNodesList path={rootPath} nodes={nodes} />;
      })}
    </div>
  );
}

function navTreeNodeKey(node: NavTreeNode, index: number): string {
  switch (node.type) {
    case "folder":
      return `folder:${index}${node.path}${node.open}`;
    case "link":
      return `link:${index}${node.path}${node.active}`;
    case "break":
      return `break:${index}`;
  }
}

interface NavTreeNodesListProps {
  path: string;
  nodes: NavTreeNode[];
}

function NavTreeNodesList({ path, nodes }: NavTreeNodesListProps) {
  return (
    <ul className={s.nodesList}>
      {nodes.map((node, i) => {
        return (
          <li key={navTreeNodeKey(node, i)}>
            <Node path={path} node={node} />
          </li>
        );
      })}
    </ul>
  );
}

function Node({ path, node }: { path: string; node: NavTreeNode }) {
  switch (node.type) {
    case "folder":
      return <FolderNode path={path} node={node} />;
    case "link":
      return <LinkNode path={path} node={node} />;
    case "break":
      return <BreakNode />;
    default:
      throw new Error(
        `Encountered an unexpected node type at ${path} \n\n ${JSON.stringify(
          node
        )}`
      );
  }
}

function BreakNode() {
  return <hr className={s.breakNode} />;
}

function FolderNode({ path, node }: { path: string; node: FolderNode }) {
  var [open, setOpen] = useState(node.open ? true : false);
  return (
    <div className={classNames(s.folderNode, { [s.isOpen]: open })}>
      <button onClick={() => setOpen(!open)}>
        {node.title}
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className={s.children}>
          <NavTreeNodesList path={path + node.path} nodes={node.children} />
        </div>
      )}
    </div>
  );
}

function LinkNode({ path, node }: { path: string; node: LinkNode }) {
  return (
    <Link
      href={path + node.path}
      className={classNames(s.linkNode, {
        [s.active]: node.active,
      })}
      text={node.title}
    />
  );
}
