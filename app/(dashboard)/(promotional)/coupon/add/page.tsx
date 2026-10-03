import { ResourceEditor } from "@/components/panel/resource-screen";
import { RESOURCES } from "@/components/panel/resources";

export default function Page() {
  return <ResourceEditor config={RESOURCES.coupons} backHref="/coupon" />;
}
