import CustomMDX from "@/components/custom-mdx";
import RootLayout from "@/layouts/root-layout";
import {
  DocsPageData,
  loadAllDocsPageSlugs,
  loadDocsPage,
} from "@/lib/fetch-docs";

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
      <h1>{title}</h1>
      <p>{description}</p>
      <br />
      <CustomMDX content={content} />
      <br />
      <div>
        <a href={`${GITHUB_REPO_URL}/edit/main/${relativeFilePath}`}>
          Edit on GitHub
        </a>
      </div>
    </RootLayout>
  );
}
