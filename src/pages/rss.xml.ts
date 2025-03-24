import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@consts";

type Context = {
  site: string;
};

export async function GET(context: Context) {
  // Fetch blog and projects collections
  const posts = await getCollection("blog");
  const projects = await getCollection("projects");

  // Combine the collections into a single array, adding a `type` property to distinguish them
  const items = [
    ...posts.map((post) => ({ ...post, type: "blog" })),
    ...projects.map((project) => ({ ...project, type: "projects" })),
  ];

  // Sort items by date in descending order
  items.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      // Use the `type` property to determine the correct link structure
      link: item.type === "blog" ? `/blog/${item.slug}/` : `/projects/${item.slug}/`,
    })),
  });
}