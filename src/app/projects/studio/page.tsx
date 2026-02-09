import ProjectHeader from "@/modules/projects/components/ProjectHeader";

const StudioPage = () => {
  return (
    <div className="px-8">
      <ProjectHeader />
      <div className="mt-16 sm:mt-24">
        <h1 className="text-hsm sm:text-hst lg:text-hs font-bold uppercase mb-8 sm:mb-12">
          studio
        </h1>
        <div className="block text-bodysm sm:text-bodyst lg:text-bodys text-dissolve-color mb-4 sm:mb-8 lg:mb-12">
          Coming soon...
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
