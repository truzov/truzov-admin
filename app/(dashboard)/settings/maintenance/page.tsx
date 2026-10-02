import { SettingsForm } from "@/components/panel/settings";
import { SETTINGS } from "@/components/panel/settings-fields";

export default function Page() {
  return <SettingsForm settingKey="maintenance" title="Maintenance mode" description="When enabled, the storefront shows this message instead of the shop." fields={SETTINGS.maintenance} />;
}

