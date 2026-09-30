import { ResourceScreen } from "@/components/panel/resource-screen";
import { RESOURCES } from "@/components/panel/resources";

export default function Page() {
  return <ResourceScreen config={RESOURCES.tags} />;
}

