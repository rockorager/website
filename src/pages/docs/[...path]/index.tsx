import CustomMDX from "@/components/custom-mdx";
import NavTree, { NavTreeNodesFixture } from "@/components/nav-tree";
import RootLayout from "@/layouts/root-layout";
import {
  DocsPageData,
  loadAllDocsPageSlugs,
  loadDocsPage,
} from "@/lib/fetch-docs";
import s from "./DocsPage.module.css";

// This is the location that we expect our docs mdx files to be located,
// relative to the root of the Next.js project.
const DOCS_DIRECTORY = "./docs";
const GITHUB_REPO_URL = "https://github.com/ghostty-org/website";

export async function getStaticPaths() {
  const docsPageSlugs = await loadAllDocsPageSlugs(DOCS_DIRECTORY);
  return {
    paths: docsPageSlugs.map((slug: string): StaticPropsParams => {
      return {
        params: {
          path: slug.split("/"),
        },
      };
    }),
    fallback: false,
  };
}

interface StaticPropsParams {
  params: {
    path: Array<string>;
  };
}

export async function getStaticProps({ params: { path } }: StaticPropsParams) {
  const docsPageData = await loadDocsPage(DOCS_DIRECTORY, path.join("/"));
  return {
    props: {
      docsPageData,
    },
  };
}

interface DocsPageProps {
  docsPageData: DocsPageData;
}

export default function DocsPage({
  docsPageData: { title, description, content, relativeFilePath },
}: DocsPageProps) {
  return (
    <RootLayout
      meta={{
        title: `Ghostty: ${title}`,
        description:
          "Fast, native, feature-rich terminal emulator pushing modern features.",
      }}
    >
      <div className={s.docsPage}>
        <div className={s.sidebar}>
          <div className={s.sidebarContentWrapper}>
            {/* TODO: Remove fixture usage */}
            <NavTree
              rootPath="/docs"
              className={s.sidebarNavTree}
              nodes={NavTreeNodesFixture}
            />
          </div>
        </div>
        <main className={s.contentWrapper}>
          <div className={s.heading}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <CustomMDX content={content} />
          <br />
          <div>
            <a href={`${GITHUB_REPO_URL}/edit/main/${relativeFilePath}`}>
              Edit on GitHub
            </a>
          </div>
        </main>
      </div>
    </RootLayout>
  );
}
