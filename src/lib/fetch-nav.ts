import { FolderNode, LinkNode, NavTreeNode } from "../components/nav-tree";
import { loadAllDocsPageSlugs, loadDocsPage } from "./fetch-docs";

interface PathTreeMetadata {
  fileAtPath: boolean;
}

// This generates Navigation data directly from the state of docs folders
//
// This is likely to not be the end solution, as this won't provide the
// same level of flexibility that manually authoring our Nav will provide.
export async function loadDocsNavTreeData(
  docsDirectory: string,
  activePageSlug: string
): Promise<NavTreeNode[]> {
  const docsPageSlugs = (await loadAllDocsPageSlugs(docsDirectory)).sort();
  var docsPagePathTree: Record<string, any & PathTreeMetadata> = {};
  docsPageSlugs.forEach((slug) =>
    slug.split("/").reduce(
      (accumulator: any, currentValue, i) =>
        (accumulator[currentValue] =
          accumulator[currentValue] ||
          ({
            fileAtPath: slug.endsWith(currentValue),
          } as PathTreeMetadata)),
      docsPagePathTree
    )
  );
  return await convertPathTreeToNavTreeNodes(
    docsDirectory,
    activePageSlug,
    "",
    docsPagePathTree
  );
}

async function convertPathTreeToNavTreeNodes(
  docsDirectory: string,
  activePageSlug: string,
  basePath: string,
  docsPagePathTree: Record<string, any & PathTreeMetadata>
): Promise<NavTreeNode[]> {
  return await Promise.all(
    Object.entries(docsPagePathTree).map(async ([path, obj]) => {
      var { fileAtPath, ...children } = obj;
      const isFolder = Object.keys(children as object).length != 0;
      if (isFolder) {
        if (fileAtPath) {
          children = {
            index: { fileAtPath: true },
            ...children,
          };
        }
        const fullPath = `${basePath}/${path}`;
        const activePagePath = `/${activePageSlug}`;
        return {
          type: "folder",
          path: `/${path}`,
          title: kebabTitleCase(path),
          children: await convertPathTreeToNavTreeNodes(
            docsDirectory,
            activePageSlug,
            fullPath,
            children
          ),
          open:
            activePagePath === fullPath ||
            activePagePath.startsWith(`${fullPath}/`),
        } as FolderNode;
      } else {
        const isIndex = path === "index";
        const fullPath = isIndex ? basePath : `${basePath}/${path}`;
        const activePagePath =
          activePageSlug !== "index" ? `/${activePageSlug}` : "";
        // TODO: this is pretty inefficient to load the entire docs page
        // just to get the title, this should be fixed in the future if
        // we adopt this strategy of automatically generating the nav.
        const docsPage = await loadDocsPage(docsDirectory, fullPath);
        return {
          type: "link",
          path: isIndex ? "/" : `/${path}`,
          // Index files usually have the same title as the folder name,
          // so as to avoid repetition, we'll default to "Overview"
          title: isIndex ? "Overview" : docsPage.title,
          active: fullPath === activePagePath,
        } as LinkNode;
      }
    })
  );
}

function kebabTitleCase(str: string) {
  return str
    .split("-")
    .filter((x) => x.length > 0)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}
