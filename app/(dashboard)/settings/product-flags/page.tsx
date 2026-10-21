import { SettingsForm } from "@/components/panel/settings";
import { SETTINGS } from "@/components/panel/settings-fields";

export default function Page() {
  return <SettingsForm settingKey="product-flags" title="Product flag rules" fields={SETTINGS.productFlags}
    description="Automatic Bestseller and New results update when these rules change. Manual overrides remain in place. Live and Featured remain manual." />;
}
