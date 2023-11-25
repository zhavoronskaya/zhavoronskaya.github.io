import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import RealisticSea from "./RealisticSea";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <RealisticSea />
    </ShotPageLayout>
  );
}
