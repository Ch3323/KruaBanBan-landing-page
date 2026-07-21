# Product & Business Logic Summary

## Scope and confidence

This document describes behavior evidenced in the current repository. **Implemented** means an active code path exists; **inferred** means intent is suggested by naming or UI but is not fully established; **unclear** calls out conflicting or missing evidence. No environment values or credentials are reproduced here.

Primary evidence: `app/`, `components/`, `hooks/`, `lib/`, `prisma/schema.prisma`, and `.github/workflows/deploy.yml`. The repository README is still a generic Next.js template and is not useful product documentation (`README.md`).

## Product overview

Krua Ban Ban is a Thai-language, mobile-first kitchen operations web app designed to run with LINE LIFF. It helps a small food business manage ingredient stock, build recipes and costs, price menu items, record daily orders, review sales/profit history, and optionally share one kitchen data set among multiple LINE users (`hooks/use-liff.ts`; `app/(features)/management/page.tsx:295`).

The product is operational rather than consumer-facing: there is no customer ordering storefront, checkout, payment collection, or public menu in this codebase.

## Users and personas

- **Solo kitchen operator / food seller:** maintains stock and recipes, prices dishes, records orders, and reviews daily performance.
- **Shared-kitchen member:** works against the same inventory, recipes, and orders as other members after joining with a six-character code (`app/(features)/management/page.tsx`; `lib/kitchen-workspace.ts`).
- **Workspace owner:** creates the shared workspace and can remove non-owner members. The owner cannot be removed by another member (`app/api/kitchen-workspaces/route.ts:216`).
- **System operator / scheduler:** invokes secret-protected maintenance and LINE notification endpoints. No browser admin console is present (`app/api/cron/`).

There are no broader roles such as cashier, chef, accountant, customer, or super-admin encoded in the schema.

## User-facing features

### Inventory

- Create, edit, delete, search, and category-filter ingredients.
- Store current amount, starting/total amount, unit, image, and optional price per unit.
- Supported units are grams, milliliters, and pieces, displayed as Thai abbreviations (`lib/inventory-units.ts`).
- Show remaining stock as a progress bar and label zero-or-less inventory as out of stock (`app/(features)/inventory/page.tsx:47`, `app/(features)/inventory/page.tsx:383`).
- Calculate price per unit from package quantity and package price (`components/inventory/add-ingredient-sheet.tsx:958`).
- Open an ingredient directly for edit or deletion through query parameters; LINE low-stock messages link to the edit form (`app/(features)/inventory/page.tsx:115`; `lib/line-low-stock-alert.ts`).
- Manage category names and category filters. Deleting a category is presented as removing the filter while retaining its ingredients, although persistence constraints make this behavior uncertain; see “Unclear or incomplete behavior.”

### Recipes and costing

- Create, edit, delete, search, and category-filter recipes, with an optional image.
- Attach existing inventory items as ingredients with quantity and preparation notes. Unit, current availability, image, and price are derived from the linked inventory record when saved (`components/recipe/recipe-editor-sheet.tsx`; `app/api/kitchen-store/route.ts:780`).
- Capture duration, energy source, electricity wattage or hourly gas cost, and free-form servings, difficulty, and notes (`prisma/schema.prisma`, `RecipeMetadata`). Some metadata is stored but not prominently rendered in the current recipe list.
- Optionally define yield quantity and yield unit when one recipe batch produces multiple saleable units (`components/recipe/recipe-editor-sheet.tsx:478`).
- Display total batch cost, cost per yield unit, saved net price, and an in-store/storefront price (`app/(features)/recipe/page.tsx:1217`).
- Set target margin, commission/GP percentage, and final net selling price. The UI can derive price automatically or accept a manual net price (`app/(features)/recipe/page.tsx:1493`).

### Orders and reporting

- Select one or more existing recipes, set quantities, optionally add an extra per-unit amount, choose the sales-channel switch, and save a daily order (`app/(features)/order/page.tsx`).
- The sales-channel option distinguishes in-store sales from the default commission-bearing channel. UI copy says in-store price excludes GP (`app/(features)/order/page.tsx:987`).
- View today’s recorded items, revenue, cost, energy cost, commission, and profit; edit quantity or delete an order (`app/(features)/order/page.tsx`).
- View order history by today, yesterday, current week, current month, or a manual date range (`app/(features)/order/history/page.tsx:47`, `app/(features)/order/history/page.tsx:452`).
- Order rows snapshot recipe name, image, and unit price, so historical display does not depend entirely on the current recipe name/image (`prisma/schema.prisma`, `DailyOrder`). Cost/profit history is nevertheless recalculated from the current recipe definition, so historical profitability can change after recipe edits (`app/(features)/order/history/page.tsx:182`).

### Shared-kitchen sync

- Create a named workspace and receive a normalized six-character join code that avoids ambiguous characters (`lib/kitchen-workspace.ts`).
- Creating a workspace copies the creator’s current categories, inventory, recipes, recipe ingredients, and orders into the new shared scope if that scope is empty (`lib/kitchen-workspace.ts:95`).
- Join an existing workspace by code; each LINE user can belong to at most one workspace (`prisma/schema.prisma`, `KitchenWorkspaceMember`; `app/api/kitchen-workspaces/route.ts:116`).
- See members, LINE display names/pictures, owner status, and member count. Owners may remove members; any member may leave (`app/(features)/management/page.tsx`).
- While active, the client saves changes after an 800 ms debounce and polls a shared sync version every five seconds. Remote updates are loaded only when there is no pending local change (`hooks/use-kitchen-store.ts`).

## Core user journeys

1. **Enter through LINE:** LIFF initializes, requests external-browser login when required, and reads the LINE profile. Data loading begins only after a profile user ID exists (`hooks/use-liff.ts`, `hooks/use-kitchen-store.ts`).
2. **Set up inventory:** create categories and ingredients, enter stock amounts and unit pricing, and optionally upload images (`app/(features)/inventory/page.tsx`).
3. **Build a recipe:** choose a category, define duration/energy/yield, link inventory ingredients and quantities, then save (`components/recipe/recipe-editor-sheet.tsx`).
4. **Price the recipe:** review ingredient plus energy cost, set margin and GP, then accept the derived price or enter a manual net price (`app/(features)/recipe/page.tsx:1493`).
5. **Record an order:** choose recipes and quantities, select the channel, add optional extras, and submit. Inventory is reduced transactionally and a low-stock LINE alert may be sent (`app/api/daily-orders/route.ts:149`).
6. **Correct an order:** changing quantity applies only the quantity delta to inventory; deleting restores all inventory consumed by that order (`app/api/daily-orders/[orderId]/route.ts:62`).
7. **Review performance:** view today’s receipt-like summary or aggregate a historical date range (`app/(features)/order/page.tsx`; `app/(features)/order/history/page.tsx`).
8. **Collaborate:** create or join a workspace, then use the same feature pages against the shared scope (`app/(features)/management/page.tsx`; `lib/kitchen-workspace.ts:44`).

## Business and domain rules

### Scope, persistence, and categories

- Standalone records are scoped by LINE user ID. Workspace members instead resolve to the workspace ID, which becomes the shared `userId`/scope on kitchen and order records (`lib/kitchen-workspace.ts:44`).
- The client treats the whole kitchen store as one aggregate. `PUT /api/kitchen-store` upserts submitted rows and deletes database rows omitted from the payload (`app/api/kitchen-store/route.ts:392`, `app/api/kitchen-store/route.ts:875`).
- The synthetic `all` category is UI-only and is never persisted (`lib/kitchen-data.ts`; `app/api/kitchen-store/route.ts:431`).
- Persisted category IDs are namespaced by scope and domain (`inventory` versus `recipe`), with normalization for legacy IDs (`app/api/kitchen-store/route.ts:63`).
- Recipe ingredients must point to inventory items present in both the request and database, and quantity must be finite and greater than zero. Invalid/missing links are skipped rather than auto-created (`app/api/kitchen-store/route.ts:780`).

### Stock consumption and low-stock rules

- Order quantity must be a positive integer; optional extra price must be finite and non-negative (`app/api/daily-orders/route.ts:72`).
- Stock adjustment per ingredient is `-(ingredient quantity / valid recipe yield) × order quantity delta` (`app/api/daily-orders/inventory-adjustments.ts:34`).
- Editing and deleting orders reverse or add only the difference, preserving transactional consistency with the order write (`app/api/daily-orders/[orderId]/route.ts`).
- The code does **not** clamp inventory at zero or reject orders with insufficient stock. Negative stock is therefore possible (`app/api/daily-orders/inventory-adjustments.ts:125`).
- “Low stock” means `currentAmount / totalAmount < 20%` when total amount is positive (`lib/line-low-stock-alert.ts:10`, `lib/line-low-stock-alert.ts:247`). Immediate order alerts fire only when an adjustment crosses from at least 20% to below 20%, limiting repeat alerts (`app/api/daily-orders/route.ts:281`).

### Cost and price rules

- Ingredient batch cost is the sum of `ingredient quantity × price per unit` for positively priced ingredients (`app/(features)/recipe/page.tsx:312`).
- Electricity cost is `(watts / 1000) × duration hours × 4.46 THB/kWh`. Gas cost is `duration hours × configured gas price per unit` (`app/(features)/recipe/page.tsx:330`). The 4.46 rate is hard-coded in recipe, order, history, and notification calculations.
- Unit cost is `(ingredient batch cost + energy cost) / valid yield quantity`; yield falls back to 1 when disabled or invalid (`app/(features)/order/page.tsx:175`).
- Storefront price before GP is `cost × (1 + margin% / 100)`.
- Derived commission-bearing net price is `storefront price / (1 - GP% / 100)`; GP at or above 100% is invalid in the pricing calculation (`app/(features)/recipe/page.tsx:403`).
- On order creation, the default channel stores `net price + extra`. In-store stores `net price × (1 - GP rate) + extra`, effectively removing the configured GP (`app/api/daily-orders/route.ts:247`).
- In-store profit is stored price less unit cost, floored at zero for summary presentation. Default-channel summaries split base margin, extra-price margin after GP, and estimated commission (`app/(features)/order/page.tsx:190`; `app/api/cron/daily-order-summary/route.ts:218`).
- Business dates use `Asia/Bangkok` and `YYYY-MM-DD`, independent of server timezone (`app/api/daily-orders/route.ts:18`).

## Data model

| Entity | Purpose and key relationships |
|---|---|
| `InventoryCategory` | Scope-owned inventory category; has many inventory items. |
| `InventoryItem` | Ingredient stock record with current/total amount, enum unit, image, optional unit price; referenced by recipe ingredients. |
| `RecipeCategory` | Scope-owned recipe category; has many recipes. |
| `RecipeItem` | Recipe identity, category, image, optional update time; has one metadata record and many ingredients. |
| `RecipeMetadata` | Duration, descriptive fields, energy inputs, margin/GP/net price, and optional batch yield. Cascades with recipe deletion. |
| `RecipeIngredient` | Recipe-to-inventory link plus a snapshot of inventory name/category/unit/image/availability/price and recipe-specific quantity/notes. |
| `DailyOrder` | Order line snapshot with recipe ID/name/image, quantity, optional unit price, channel flag, Bangkok business date, and timestamps. |
| `KitchenWorkspace` | Named shared scope with unique join code and creator user ID. |
| `KitchenWorkspaceMember` | One-to-one membership per LINE user, profile snapshot, workspace relation, and join time. |
| `kitchen_sync_signals` | Raw-SQL support table storing a UUID version per scope; intentionally absent from the Prisma schema (`lib/kitchen-workspace.ts:55`). |

Canonical schema evidence: `prisma/schema.prisma`. The browser-facing aggregate types are in `lib/kitchen-data.ts`.

## Permissions and access control

- Client login/profile discovery uses LINE LIFF (`hooks/use-liff.ts`). Missing LIFF configuration or profile prevents kitchen data loading.
- Kitchen, upload, order, sync, and workspace APIs require an `x-liff-user-id` header and scope queries/writes by that value or its workspace (`app/api/`).
- **Security caveat:** no server-side LIFF access-token or ID-token verification is visible. The APIs trust the caller-supplied user ID header, so identity enforcement appears incomplete if routes are reachable outside a trusted proxy/runtime.
- Workspace owner-only authorization exists for removing another member; members can remove themselves. There is no owner-only restriction on shared kitchen data—every workspace member can edit the shared aggregate and orders (`app/api/kitchen-workspaces/route.ts:216`).
- Cron routes require exact `Authorization: Bearer <CRON_SECRET>` and refuse access if the secret is missing (`app/api/cron/`).
- Upload object keys are placed under the supplied user ID, while shared data may use a workspace scope. This is storage organization, not an authorization check (`app/api/uploads/route.ts:86`).

## APIs, jobs, and webhooks

| Route | Behavior |
|---|---|
| `GET /api/kitchen-store` | Resolve scope, seed defaults if needed, and return categories, inventory, recipes, metadata, and ingredients. |
| `PUT /api/kitchen-store` | Persist the complete aggregate transactionally, delete omitted records, bump sync version, and best-effort delete newly unreferenced R2 images. |
| `GET /api/kitchen-sync` | Return the current scope sync version used by five-second polling. |
| `GET /api/kitchen-workspaces` | Return membership/workspace and refresh the requesting member’s LINE profile snapshot. |
| `POST /api/kitchen-workspaces` | Create a workspace with copied personal data or join one by code. |
| `DELETE /api/kitchen-workspaces` | Leave, owner-remove a member, and delete an empty workspace. |
| `POST /api/uploads` | Validate and upload an image of at most 10 MiB to Cloudflare R2. Client-side processing converts non-GIF images to JPEG, max 2400 px, quality 0.88 (`lib/upload-image.ts`). |
| `GET /api/daily-orders` | Return one requested valid business date, defaulting to today. |
| `POST /api/daily-orders` | Create order lines, reduce inventory, bump sync, and best-effort push threshold-crossing alerts. |
| `PATCH /api/daily-orders/[orderId]` | Change quantity and apply the inventory delta. |
| `DELETE /api/daily-orders/[orderId]` | Delete order and restore consumed inventory. |
| `GET /api/cron/daily-order-summary` | Send each scope’s current-day LINE Flex sales/cost/profit summary, showing up to ten recipe groups. |
| `GET /api/cron/out-of-stock-summary` | Push a LINE Flex alert for every item currently below 20%. |
| `GET /api/cron/cleanup-unused-images` | Scan bounded R2 pages and delete old unreferenced uploads; defaults: older than 24 hours, at most 50 deletions, 3 pages, 100 objects/page. |

No inbound webhook handler, queue worker, or scheduler configuration is present. The cron endpoints exist, but their actual invocation schedule is external/unclear. Deployment runs on pushes to `master`, builds a container, applies Prisma migrations, and deploys through GHCR/SSH (`.github/workflows/deploy.yml`).

## Notifications and integrations

- **LINE LIFF:** login, profile, and user identity on the client (`hooks/use-liff.ts`).
- **LINE Messaging API:** outbound Flex messages for low stock and daily order summaries. Workspace messages fan out to valid LINE member IDs; standalone messages target the scope/user ID (`lib/line-low-stock-alert.ts`; `app/api/cron/daily-order-summary/route.ts`).
- **Cloudflare R2 / S3 API:** public ingredient and recipe image storage plus deletion/garbage collection (`lib/r2-storage.ts`).
- **PostgreSQL + Prisma:** durable domain data (`prisma/schema.prisma`; `lib/prisma.ts`).
- **Infisical, GitHub Container Registry, Tailscale, SSH/Docker:** deployment infrastructure only (`.github/workflows/deploy.yml`).
- **Sonner:** short, top-center success/error toasts in the UI (`app/layout.tsx`; `lib/toast.ts`).

No email, SMS, payment provider, analytics SDK, maps, accounting platform, or third-party commerce integration is present.

## Billing, subscriptions, and limits

There is no product billing, subscription, plan, entitlement, quota, or metered-usage model in the schema or application code. Technical limits found are image upload size (10 MiB), client image normalization (2400 px), bounded R2 cleanup, a six-character workspace code, and LINE’s valid target-ID format; these are not commercial limits.

## Navigation and screens

| Path | Screen |
|---|---|
| `/` | Spinner-only landing shell. No redirect or navigation is implemented in this file (`app/page.tsx`). |
| `/inventory` | Ingredient inventory grid, search/categories, stock status, add/edit/delete sheets. |
| `/recipe` | Recipe cards, search/categories, recipe editor, ingredient detail sheet, and pricing dialog. |
| `/order` | Today’s order/receipt view, menu selection sheet, channel switch, quantity and extra-price controls. |
| `/order/history` | Date-range order history and aggregate financial summary. |
| `/management` | Shared workspace creation/joining, code copy, membership management, and links to the three main areas. |

There is no persistent global tab bar/sidebar in the codebase. The only explicit cross-feature navigation is on `/management`, plus the order/history back-and-forth link. Normal LINE entry routes may therefore be configured externally; the root route itself remains non-functional beyond loading.

## Brand, visual system, and product tone

- **Name:** “Krua Ban Ban” appears as the default workspace name; no formal wordmark or logo component is present (`app/(features)/management/page.tsx:110`).
- **Language/tone:** Thai-first, practical, friendly, and direct. Labels favor everyday kitchen/business language, examples, concise confirmations, and clear destructive warnings. Document language metadata is currently `lang="en"`, which conflicts with the Thai UI (`app/layout.tsx:27`).
- **Typography:** Google Kanit at weights 100–900, applied globally (`app/layout.tsx`).
- **Component system:** shadcn/ui `radix-nova`, Radix primitives, Lucide icons, Tailwind CSS v4, semantic CSS variables, and RSC mode (`components.json`).
- **Color direction:** warm yellow primary, brown primary foreground, near-black olive-tinted text, white/soft neutral surfaces, and red destructive state. Tokens use OKLCH. Light and dark token sets exist (`app/globals.css`).
- **Theme tokens:** semantic background/foreground/card/popover/primary/secondary/muted/accent/destructive/border/input/ring, five warm chart colors, sidebar tokens, and a base radius of `0.875rem` with derived radii (`app/globals.css`).
- **UI patterns:** rounded cards and image tiles, bottom sheets for mobile editing/selection, dialogs for confirmation/pricing, category carousels, badges, progress bars, dropdown action menus, skeleton-like spinners, receipt-style summaries, and top-center toasts (`components/`; feature pages).
- **Layout:** mobile-first containers with responsive grids, large touch targets, bottom sheets capped by viewport height, hidden scrollbars, disabled text selection, and viewport zoom disabled (`app/layout.tsx`; `app/globals.css`).
- **Dark mode:** tokens and component styles exist, but no theme switch or `ThemeProvider` is present; dark mode activation is therefore not user-facing in this repository.

There is no separate `tailwind.config.*`; Tailwind v4 theme mapping and CSS variables live in `app/globals.css` as configured by `components.json`.

## Admin and internal tools

- `/management` is a workspace/member management screen, not a platform-wide admin console.
- Secret-protected cron endpoints act as operational tools for LINE summaries and R2 cleanup.
- CI/CD performs linting, build, migrations, container publish, and deployment. It does not run an automated test suite (`package.json`; `.github/workflows/deploy.yml`).

## Incomplete, inferred, deprecated, or unclear behavior

- **Root/loading flow incomplete:** `/` permanently renders a spinner; no redirect, login prompt, or error state is present (`app/page.tsx`). Feature pages depend on LIFF profile data but do not visibly initiate login themselves.
- **Identity verification incomplete:** server routes trust `x-liff-user-id`; authorization is scoped but not cryptographically authenticated in this codebase.
- **Category deletion conflict:** UI copy says items remain when a category is deleted, but the database category foreign keys are restrictive and the aggregate save deletes missing categories. With items still referencing the category, persistence may fail (`components/category-carousel.tsx:221`; `prisma/schema.prisma`; `app/api/kitchen-store/route.ts:922`). Feature-specific category handlers should be tested against this rule.
- **Workspace departure semantics unclear:** leaving a workspace removes membership but does not copy shared data back to the user’s personal scope. The user appears to resume whatever personal data existed before joining; changes made while shared are not migrated back (`app/api/kitchen-workspaces/route.ts:216`).
- **Owner lifecycle incomplete:** the owner is allowed to leave their own workspace. If members remain, `createdByUserId` continues to identify a non-member, and no ownership transfer is implemented. Remaining members may then have no effective owner controls (`app/api/kitchen-workspaces/route.ts:216`).
- **Concurrent write risk:** the client avoids reloading while it has local changes, but aggregate PUTs have no compare-and-swap/version precondition. Near-simultaneous edits by members can be last-write-wins (`hooks/use-kitchen-store.ts`; `app/api/kitchen-store/route.ts`).
- **Negative stock permitted:** recording orders can drive stock below zero; this may be intentional but is not explained in the UI or domain validation.
- **Historical financial drift:** order price/name/image are snapshotted, but cost, GP, margin, yield, and energy inputs are not. History and daily summaries query current recipes, so old profit figures may change or degrade if a recipe is edited/deleted (`app/(features)/order/history/page.tsx`; `app/api/cron/daily-order-summary/route.ts`).
- **Daily summary recipe lookup ambiguity:** the cron loads recipes by ID without also constraining scope. IDs are normally unique, but scope is part of the domain convention (`app/api/cron/daily-order-summary/route.ts:646`).
- **Unused/de-emphasized metadata:** `servings`, `difficulty`, and recipe `notes` remain in types/schema, but current recipe editing emphasizes duration, energy, yield, and ingredients; their active user workflow is limited or unclear (`lib/kitchen-data.ts`; `components/recipe/recipe-editor-sheet.tsx`).
- **Disabled ingredient auto-create:** server code contains an `ENABLE_RECIPE_INGREDIENT_INVENTORY_UPSERT = false` branch. Missing inventory rows are skipped, marking the auto-create behavior as deliberately inactive (`app/api/kitchen-store/route.ts:22`).
- **Migration history:** `totalPrice` was renamed to `pricePerUnit`, `electricityPricePerUnit` to `electricityPowerWatt`, and a sync table was dropped then recreated. Current code/schema names above are authoritative (`prisma/migrations/`).
- **Dark mode incomplete:** token support exists without a user control/provider.
- **No tests found:** no test files or test script are present, so business-rule regression coverage is unclear (`package.json`).
- **Scheduling external:** cron routes exist, but schedules are not defined in the repository.

