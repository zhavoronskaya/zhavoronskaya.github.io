import { notFound } from "next/navigation";
import { ClientProjectPageLayout } from "@/modules/projects/components/ClientProjectPageLayout";
import {
  CLIENT_VIDEO_GRID_ITEMS,
  type ClientVideoGridItem,
} from "@/data/clientProjects";

type Props = {
  params: Promise<{ slug: string }>;
};

function getClientProject(slug: string): ClientVideoGridItem | undefined {
  return CLIENT_VIDEO_GRID_ITEMS.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return CLIENT_VIDEO_GRID_ITEMS.map((item) => ({ slug: item.slug }));
}

export default async function ClientProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getClientProject(slug);
  if (!project) notFound();

  return (
    <ClientProjectPageLayout project={project} sections={project.sections} />
  );
}
