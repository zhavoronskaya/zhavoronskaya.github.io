import { notFound } from "next/navigation";
import ProjectHeader from "@/modules/projects/components/ProjectHeader";
import { ProjectLayoutSvgAnimation } from "@/components/SvgAnimation";
import FadingText from "@/components/FadingText";
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
    <>
      <ProjectLayoutSvgAnimation />
      <div className="px-6 sm:px-8 ">
        <ProjectHeader />
        <div className="mt-16 sm:mt-36 sm:grid sm:grid-cols-12 relative">
          <div className="sm:col-start-1 sm:col-span-11">
            <h1 className="text-hxlm sm:text-hxlt lg:text-hxl font-bold">
              <FadingText className="subtitle">{project.name}</FadingText>
            </h1>
            <p className="mt-4 sm:mt-8 lg:mt-12 text-bodysm sm:text-bodyst lg:text-bodys text-dissolve-color">
              more coming soon
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
