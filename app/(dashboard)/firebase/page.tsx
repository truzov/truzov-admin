import { SettingsForm } from "@/components/panel/settings";
import { SETTINGS } from "@/components/panel/settings-fields";

export default function Page() {
  return <SettingsForm settingKey="firebase" title="Firebase" description="The web config is public by design. The service-account JSON is encrypted and never leaves the server." fields={SETTINGS.firebase} />;
}

