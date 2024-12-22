import { Breadcrumb } from "@/components/breadcrumbs";
import { FolderNode, LinkNode, NavTreeNode } from "@/components/nav-tree";

export function navTreeToBreadcrumbs(
  firstBreadcrumbTitle: string,
  docsRootPath: string,
  navTree: NavTreeNode[],
  activePageSlug: string,
): Breadcrumb[] {
  var breadcrumbs: Breadcrumb[] = [];
  var accumulatedPath = "";
  var currentNavTree = navTree;
  var segments = activePageSlug.split("/");

  breadcrumbs.push({
    text: firstBreadcrumbTitle,
    href: docsRootPath,
  });

  // If we're on the root docs page, we can just exit early
  if (segments[0] === "index") {
    return breadcrumbs;
  }

  // Go through each URL segment & determine the breadcrumb to push to our array
  while (segments.length) {
    // Find the Node which represents the URL segment we're on
    var nextNode: FolderNode | LinkNode | undefined = currentNavTree.find(
      (node) => {
        if (node.type === "folder" || node.type === "link") {
          if (node.path === `/${segments[0]}`) {
            return true;
          }
        }
        return false;
      },
    ) as FolderNode | LinkNode | undefined;
    if (typeof nextNode === "undefined") {
      throw new Error("Could not load next segment");
    }

    if (nextNode.type === "folder") {
      // Set the currentNavTree Node to its children for the next iteration
      currentNavTree = nextNode.children;

      // if folder has a children with path of `/`, that's an overview page,
      // so we'll link to that.
      const hasOverviewPage = currentNavTree.some(
        (e) => e.type === "link" && e.path === "/",
      );

      breadcrumbs.push({
        text: nextNode.title,
        href: hasOverviewPage
          ? docsRootPath + accumulatedPath + nextNode.path
          : null,
      });
    } else {
      // It's a link
      breadcrumbs.push({
        text: nextNode.title,
        href: docsRootPath + accumulatedPath + nextNode.path,
      });
    }

    // Accumulate the current paths, and shift the array so the next iteration
    // picks up the next segment in the URL
    accumulatedPath += nextNode.path;
    segments.shift();
  }

  return breadcrumbs;
}
