import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Perlin1/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      dpr={1}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 18],
      }}
      withActions={true}
      hrefBackArrow="/shots/20"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
