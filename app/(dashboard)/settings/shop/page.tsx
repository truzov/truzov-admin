import { SettingsForm } from "@/components/panel/settings";
import { SETTINGS } from "@/components/panel/settings-fields";

export default function Page() {
  return <SettingsForm settingKey="shop" title="Shop settings" fields={SETTINGS.shop} />;
}

