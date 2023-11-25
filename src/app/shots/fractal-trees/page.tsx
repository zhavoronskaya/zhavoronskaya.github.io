import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import FractalTrees from "./FractalTrees";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <FractalTrees />
    </ShotPageLayout>
  );
}
