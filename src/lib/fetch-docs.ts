import matter from "gray-matter";
import recurse, { Item } from "klaw-sync";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { type Node } from "unist";
import { visit } from "unist-util-visit";
import remarkGfm from "remark-gfm";
import slugify from "slugify";
import rehypeHighlight, {type Options as RehypeHighlightOptions} from 'rehype-highlight'
import remarkCallout, {type Options as RemarkCalloutOptions} from "@r4ai/remark-callout";
const nodePath = require("path");

const MDX_EXTENSION = ".mdx";

export type PageHeader = {
  id: string;
  title: string;
  depth: number;
};

export interface DocsPageData {
  slug: string;
  title: string;
  description: string;
  hideSidecar: boolean;
  content: MDXRemoteSerializeResult;
  relativeFilePath: string;
  pageHeaders: PageHeader[];
}

export async function loadDocsPage(
  docsDirectory: string,
  slug: string
): Promise<DocsPageData> {
  // A file with a given slug can be located in one of two places.
  // First we attempt to load the file from the non-index path first.
  // e.g. `/docs/foo.mdx` will be tried before `/docs/foo/index.mdx`.
  try {
    return await loadDocsPageFromRelativeFilePath(
      nodePath.join(docsDirectory, slug + MDX_EXTENSION)
    );
  } catch (err) {
    // If we run into an error because the file didn't exist catch this error
    // because we're going to check the other possible location.
    if (!isErrorWithCode(err) || err.code !== "ENOENT") {
      // Some other unexpected error occurred
      throw err;
    }
  }
  // Now we'll attempt to load the index file path.
  return await loadDocsPageFromRelativeFilePath(
    nodePath.join(docsDirectory, slug, "index" + MDX_EXTENSION)
  );
}

async function loadDocsPageFromRelativeFilePath(
  relativeFilePath: string
): Promise<DocsPageData> {
  const mdxFileContent = matter.read(relativeFilePath);
  const slug = slugFromRelativeFilePath(relativeFilePath);

  var pageHeaders: PageHeader[] = [];

  const content: MDXRemoteSerializeResult = await serialize(mdxFileContent.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [
          remarkCallout,
          {
            root: (callout) => ({
              tagName: 'callout',
              properties: {
                type: callout.type.toLowerCase(),
                isFoldable: String(callout.isFoldable),
              },
            }),
            // We won't use title, just type.
            title: () => ({
              tagName: 'callout-title',
              properties: {},
            }),
          } satisfies RemarkCalloutOptions,
        ],
        // Parse out the Anchor links and place them in the array defined above
        () => {
          type HeadingNode = {
            type: 'heading'
            depth: number
            children: {
              type: string
              value: string
            }[]
          }
          return function (node: Node) {
            visit(node, 'heading', (node: Node) => {
              if (node.type === 'heading') {
                let headingNode = node as HeadingNode
                if (headingNode.children.length > 0) {
                  const text = headingNode.children.map((v) => v.value).join('')
                  pageHeaders.push({
                    depth: headingNode.depth,
                    id: `#${slugify(text.toLowerCase())}`,
                    title: text,
                  })
                }
              }
            })
          }
        },
      ],
      rehypePlugins: [[rehypeHighlight, {detect: true} satisfies RehypeHighlightOptions]],
    },
  })

  return {
    slug,
    relativeFilePath,
    title: mdxFileContent.data.title,
    description: mdxFileContent.data.description,
    hideSidecar: mdxFileContent.data.hasOwnProperty("hideSidecar")
      ? mdxFileContent.data.hideSidecar
      : false,
    content,
    pageHeaders,
  };
}

export async function loadAllDocsPageSlugs(
  docsDirectory: string
): Promise<Array<string>> {
  const allPaths = recurse(docsDirectory, {
    nodir: true,
    filter: (file: Item): boolean => {
      return file.path.endsWith(MDX_EXTENSION);
    },
    traverseAll: true,
  }).map((item: recurse.Item) => {
    return item.path;
  });
  var docsPageSlugs: Set<string> = new Set();
  for (let i = 0; i < allPaths.length; i++) {
    const path = allPaths[i];
    const relativeFilePath = nodePath.relative(docsDirectory, path);
    const slug = slugFromRelativeFilePath(relativeFilePath);
    if (docsPageSlugs.has(slug)) {
      throw new Error(
        `There is a conflict in generating the ${docsDirectory}/${slug} page.

It is likely that both of these files exist:
  - ${docsDirectory}/${slug}.mdx
  - ${docsDirectory}/${slug}/index.mdx
Both of these files resolve to the same URL, and will cause an issue.

To fix this error, delete one of these files.`
      );
    } else {
      docsPageSlugs.add(slug);
    }
  }
  return Array.from(docsPageSlugs);
}

const isErrorWithCode = (err: unknown): err is Error & { code: unknown } => {
  return err instanceof Error && "code" in (err as any);
};

function slugFromRelativeFilePath(relativeFilePath: string): string {
  return (
    relativeFilePath
      // Strip the `.mdx` extension from the filename
      .replaceAll(MDX_EXTENSION, "")
      // Include support for index files (`/docs/topic/index.mdx` -> `topic`)
      .replaceAll(/\/index$/gi, "")
  );
}
