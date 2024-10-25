import Link from "next/link";

const ProjectHeader = () => {
  return (
    <div className="mt-6 sm:mt-12">
      <Link
        href="/projects"
        className=" block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
      >
        projects
      </Link>
    </div>
  );
};

export default ProjectHeader;