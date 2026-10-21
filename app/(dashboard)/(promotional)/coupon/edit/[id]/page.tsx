import { ResourceEditor } from "@/components/panel/resource-screen";
import { RESOURCES } from "@/components/panel/resources";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ResourceEditor config={RESOURCES.coupons} id={id} backHref="/coupon" />;
}
