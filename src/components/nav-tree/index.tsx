import classNames from "classnames";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import s from "./NavTree.module.css";

export type NavTreeNode = FolderNode | LinkNode | BreakNode | TitleNode;

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

type BreakNode = {
  type: "break";
};

type TitleNode = {
  type: "title";
  title: string;
};

interface NavTreeProps {
  className?: string;
  rootPath: string;
  nodes: NavTreeNode[];
}

export default function NavTree({ className, rootPath, nodes }: NavTreeProps) {
  return (
    <div className={classNames(s.navTree, className)}>
      <NavTreeNodesList path={rootPath} nodes={nodes} />
    </div>
  );
}

// ===================

interface NavTreeNodesListProps {
  path: string;
  nodes: NavTreeNode[];
}

function NavTreeNodesList({ path, nodes }: NavTreeNodesListProps) {
  return (
    <ul className={s.nodesList}>
      {nodes.map((node, i) => {
        return (
          <li key={`${path} (${i})`}>
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
      return <BreakNode node={node} />;
    case "title":
      return <TitleNode node={node} />;
    default:
      throw new Error(
        `Encountered an unexpected node type at ${path} \n\n ${JSON.stringify(
          node
        )}`
      );
  }
}

// ======

function TitleNode({ node }: { node: TitleNode }) {
  // TODO
  return <div></div>;
}

function BreakNode({ node }: { node: BreakNode }) {
  // TODO
  return <hr />;
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
    <a
      href={path + node.path}
      className={classNames(s.linkNode, {
        [s.active]: node.active,
      })}
    >
      {node.title}
    </a>
  );
}
