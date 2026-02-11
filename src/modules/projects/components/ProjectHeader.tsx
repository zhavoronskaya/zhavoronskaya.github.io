import TransitionLink from "@/components/TransitionLink";

const ProjectHeader = () => {
  return (
    <div className="mt-6 sm:mt-12 relative z-20">
      <TransitionLink
        href="/projects"
        className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium mix-blend-difference"
      >
        projects
      </TransitionLink>
    </div>
  );
};

export default ProjectHeader;
