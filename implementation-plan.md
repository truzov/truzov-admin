# truzov admin review fixes — 2026-10-08

Checked the review document against the active admin source first. The main support screen already uses persisted tickets, seller replies, admin status/replies, and website seller enquiries; reuse it.

1. Use backend role-scoped password and OTP endpoints; keep mismatch feedback generic and lock role tabs during requests. Preserve signup/onboarding.
2. Remove unused Firebase settings/menu/route/example config after confirming no SDK/runtime dependency. Backend owns stored-setting removal migration.
3. Lowercase the visible brand, metadata, and image alternatives; replace the generic favicon with the unchanged approved truzov logo as the app icon. Preserve environment variable contracts.
4. Add Auto/Force on/Force off for Bestseller/New with server results and source shown in the admin table. Keep Live and Featured manual. Reuse the vendor product form for admin-only create/edit, selecting an approved active seller on creation; ownership stays immutable. Reuse settings editor for bounded integer rule windows/minimum paid units (excluding cancelled/returned orders) at `/settings/product-flags`.
5. Replace the legacy fake ticket detail route with the existing authenticated real ticket view. Root FINDINGS.md records product/category/onboarding investigation before product changes.
6. Add scoped-auth/API/mode/route regression checks. Target-controlled tests/build/browser are pending because the requested security skill requires an OS sandbox with network isolation, allowlisted environment, read-only mounts, and resource limits, which this host has not supplied.

No new dependency, migration, deployment, or seller onboarding change in this admin repository.
