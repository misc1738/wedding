# Installed apps — Xiaomi 23129RAA4G (Redmi Note 13 Pro 5G, `sapphire`)

Source: `C:\Users\4RCH4NG3L\AppData\Local\Android\Sdk\platform-tools\adb.exe`
Counts at first pull: **72 third-party · 380 system · 452 total**
Current counts: **68 third-party · 359 system · 427 total**

## Removal log

### 2026-10-12 — batch 1 (all `Success`, verified gone)
`com.miui.analytics` · `com.miui.msa.global` · `com.mi.globalbrowser` · `com.mi.appfinder` · `com.xiaomi.mipicks` · `com.mi.globalminusscreen` · `com.miui.player` · `com.miui.videoplayer` · `com.miui.cleaner`

- Method: `adb shell pm uninstall --user 0 <pkg>` (no root)
- Verified: full `pm list packages` diff shows exactly these 9 removed, 0 added; total 452 → 443
- APK stubs still exist on the read-only system image (`pm list packages -u` shows them); restore with `adb shell pm install-existing <pkg>`
- Core packages re-checked as present: systemui, miui.home, settings, gms, vending, xmsf, securitycenter

### 2026-10-12 — batch 2 (all `Success`, verified gone)
`com.miui.fmservice` · `com.miui.fm` · `com.miui.yellowpage` · `com.mi.healthglobal` · `com.mi.global.shop` · `com.miui.huanji` · `com.facebook.appmanager` · `com.facebook.services` · `com.facebook.system` · `com.google.android.videos`

- Method: `adb shell pm uninstall --user 0 <pkg>` (no root), same as batch 1
- Verified: full `pm list packages` diff shows exactly these 10 removed, 0 added; total 443 → 433
- Third-party count 72 → 70 (`com.mi.global.shop`, `com.miui.huanji` were `-3` installs); system 371 → 363
- Partition before removal: `/product` for fmservice, yellowpage, healthglobal, videos (stub remains in image); `/data` for com.miui.fm, com.mi.global.shop, com.miui.huanji, and all three Facebook packages (fully gone)
- Core packages re-checked as present: systemui, miui.home, settings, gms, vending, xmsf, securitycenter, cloudservice, xiaomi.account, android.phone, xiaomi.phone

### 2026-10-12 — batch 3 (Chrome)
`com.android.chrome`

- Method: `adb shell pm uninstall --user 0 com.android.chrome` (no root), `exit=0` / `Success`
- Verified: full `pm list packages` diff shows exactly this 1 removed, 0 added; total 433 → 432; system 363 → 362 (third-party unchanged at 70)
- `pm path com.android.chrome` now returns empty — package fully gone from user 0
- **`com.google.android.webview` deliberately kept**: it is the active WebView provider (`dumpsys webviewupdate` → `Current WebView package: com.google.android.webview, 153.0.8010.57`, `Any WebView package installed: true`). Removing it would break web content in other apps.
- Remaining browsers after removal: `com.brave.browser`, `org.mozilla.firefox`
- Re-checked core: systemui, miui.home, settings, gms, vending, webview, xmsf — all present; 0 chrome-related crashes; no PackageManager errors

### 2026-10-12 — batch 4 (Google Home / Chromecast, user-approved)
`com.google.android.apps.chromecast.app`

- Method: `adb shell pm uninstall --user 0 com.google.android.apps.chromecast.app`, `exit=0` / `Success`
- Full `/data` install (`/data/app/~~WeCGzBFu2M0S6VcxmwKrnQ==/...`), so it is fully deleted; `pm path` now returns empty
- Verified: full diff shows exactly 1 removed, 0 added; total 432 → 431; third-party 70 → 69, system unchanged at 362
- Distinct from `com.android.chrome` (batch 3) — this is the Google Home / casting app, removed only after an explicit user confirmation

### 2026-10-12 — batch 5 (Files by Google)
`com.google.android.apps.nbu.files`

- Method: `adb shell pm uninstall --user 0 com.google.android.apps.nbu.files`, `exit=0` / `Success`
- Full `/data` install (`/data/app/~~fRR7OWv__FblJE-qUfQiEQ==/...`); `pm path` now returns empty
- Verified: full diff shows exactly 1 removed, 0 added; total 431 → 430; third-party 69 → 68, system unchanged at 362
- Also present and left alone: `com.google.android.apps.docs` (Drive), `com.google.android.apps.docs.editors.docs` / `.slides`, `com.mi.android.globalFileexplorer` (Xiaomi File Manager), `com.google.android.documentsui` (system file picker — core)

### 2026-10-12 — batch 6 (Google One, YouTube, YouTube Music)
`com.google.android.youtube` · `com.google.android.apps.youtube.music` · `com.google.android.apps.subscriptions.red`

- Method: `adb shell pm uninstall --user 0 <pkg>`, all three `exit=0` / `Success`, `batch_fail=0`
- All three were `/data/app/~~...` installs; `pm path` now returns empty for each
- Verified: full diff shows exactly 3 removed, 0 added; total 430 → 427; system 362 → 359, third-party unchanged at 68 (all three were system-flagged)
- Intent/role re-check after removal: `BROWSER` → `org.mozilla.firefox`; `VIEW https://www.youtube.com` → Firefox (YouTube links now open in the browser); `GET_CONTENT` → photopicker; `OPEN_DOCUMENT` → documentsui; `SEND` → intentresolver; `WEB_SEARCH` → googlequicksearchbox; all resolve
- Health: `alive`, WebView active, 0 youtube/googleone crashes, 0 PackageManager errors

### 2026-10-12 — batch 7 (ShareMe) — **UNINSTALL BLOCKED, DISABLED INSTEAD**
`com.xiaomi.midrop` — **still installed**, but **disabled for user 0**

- Attempted: `pm uninstall --user 0`, `pm uninstall -k --user 0`, plain `adb uninstall`, and a retry after `am force-stop` — **all four returned `Failure [-1000]`**
- Root cause captured in logcat at the moment of the attempt:
  - `D PackageManager: Uninstall pkg: com.xiaomi.midrop u0 flags:0 from u2000/26675 of null`
  - `D PKMSImpl: MIUILOG- can't uninstall pkg : com.xiaomi.midrop callingUid : 2000`
  - `callingUid 2000` = the adb shell. MIUI's `PKMSImpl` refuses shell-initiated uninstall of this package, so **adb alone cannot remove it** (this is a MIUI policy block, not a transient error)
- Ruled out by diagnosis: not running (`pidof` empty), `hidden=false`, `suspended=false`, `quarantined=false`, no system flag (`pkgFlags=[ HAS_CODE ALLOW_CLEAR_USER_DATA ALLOW_BACKUP LARGE_HEAP ]`), not a device admin/owner (`dpm list-owners` returned SecurityException), `installerPackageName=null`
- Fallback applied and confirmed: `pm disable-user --user 0 com.xiaomi.midrop` → `new state: disabled-user`, `enabled=3`, present in `pm list packages -d`. It will not launch, appear in the launcher, or run in background, but **the APK still occupies storage in `/data/app/MIDrop/`**
- Counts therefore unchanged: 68 · 359 · 427
- To remove completely, uninstall by hand on the device (Settings → Apps → Manage apps → ShareMe → Uninstall); no adb workaround exists without root

Removal commands:
- Third-party: `adb uninstall <pkg>`
- System: `adb shell pm uninstall --user 0 <pkg>` (no root; restore with `adb shell pm install-existing <pkg>`)

## Functional verification after removals

Intent resolution and roles re-checked after batches 3–5 (nothing was left unhandled):

| Check | Result |
|-------|--------|
| `cmd role get-role-holders android.app.role.BROWSER` | `org.mozilla.firefox` (default browser reassigned after Chrome removal) |
| `VIEW http://` / `https://` | `org.mozilla.firefox/...IntentReceiverActivity` |
| `GET_CONTENT */*` | `com.google.android.photopicker/...PhotopickerGetContentActivity` |
| `OPEN_DOCUMENT */*` | `com.google.android.documentsui/...PickActivity` |
| `SEND text/plain` | `com.android.intentresolver/.ResolverActivity` |
| `dumpsys webviewupdate` | `com.google.android.webview` still current provider |

> Note: an earlier run of these queries reported `No activity found` — that was a **faulty test**, not a device problem: `-t "*/*"` was glob-expanded by the device shell. Re-run with the pattern single-quoted for the device shell, everything resolved. Likewise `cmd role list-held` / `cmd role holders` are invalid subcommands; the correct one is `get-role-holders`.

---

## Section A — Third-party apps (68) — `pm list packages -3`

> Regenerated from a live `pm list packages -3` pull after batch 5. Numbers below are current; the batches in the Removal log are no longer in this table.

| # | Package | App |
|---|---------|-----|
| 1 | `app.organicmaps` | Organic Maps (offline maps)    |
| 2 | `app.pandapanda.panda` | Panda    |
| 3 | `ch.protonvpn.android` | Proton VPN    |
| 4 | `cn.wps.xiaomi.abroad.lite` | WPS Office Lite (Xiaomi preload)    |
| 5 | `com.airtel.africa.selfcare` | Airtel Selfcare    |
| 6 | `com.android.soundrecorder` | Sound Recorder    |
| 7 | `com.annazhang.pxlcam` | PXL Cam    |
| 8 | `com.anydo` | Any.do    |
| 9 | `com.aurora.store` | Aurora Store (Play Store anon client)    |
| 10 | `com.azure.authenticator` | Microsoft Authenticator    |
| 11 | `com.blackboard.android.bbstudent` | Blackboard    |
| 12 | `com.block.juggle` | Block Juggle    |
| 13 | `com.brave.browser` | Brave Browser    |
| 14 | `com.chumz.app` | Chumz (savings)    |
| 15 | `com.deepseek.chat` | DeepSeek    |
| 16 | `com.gaman.games.leek.factory.tycoon` | Leek Factory Tycoon    |
| 17 | `com.google.android.apps.adm` | Google ADM    |
| 18 | `com.google.android.apps.bard` | Gemini    |
| 19 | `com.google.android.apps.carrier.carrierwifi` | Carrier WiFi service — keep    |
| 20 | `com.google.android.apps.docs.editors.docs` | Google Docs    |
| 21 | `com.google.android.apps.docs.editors.slides` | Google Slides    |
| 22 | `com.google.android.apps.labs.language.tailwind` | Google AI / Tailwind    |
| 23 | `com.google.android.apps.walletnfcrel` | Google Wallet    |
| 24 | `com.google.android.contactkeys` | Contact keys — keep    |
| 25 | `com.google.android.safetycore` | SafetyCore (on-device content safety)    |
| 26 | `com.google.android.verifier` | Package verifier — keep    |
| 27 | `com.ichi2.anki` | AnkiDroid    |
| 28 | `com.instagram.android` | Instagram    |
| 29 | `com.involio.app` | Involio    |
| 30 | `com.knoeyes.usiuafrica.mobile` | USIU Africa    |
| 31 | `com.medhaapps.wififtpserver` | WiFi FTP Server    |
| 32 | `com.meld.app` | Meld    |
| 33 | `com.microsoft.appmanager` | Phone Link    |
| 34 | `com.microsoft.office.outlook` | Outlook    |
| 35 | `com.miui.android.fashiongallery` | Wallpaper Carousel (lock-screen ads)    |
| 36 | `com.miui.calculator` | Calculator    |
| 37 | `com.miui.compass` | Compass    |
| 38 | `com.miui.mediaeditor` | Gallery editor    |
| 39 | `com.miui.notes` | Notes    |
| 40 | `com.miui.screenrecorder` | Screen Recorder    |
| 41 | `com.miui.virtualsim` | Virtual SIM    |
| 42 | `com.miui.weather2` | Weather    |
| 43 | `com.okoafundsapp.DefenTraders` | OkoAFunds Defen Traders    |
| 44 | `com.onlyoffice.documents` | ONLYOFFICE    |
| 45 | `com.pujiagames.IslandTime` | Island Time    |
| 46 | `com.reddit.frontpage` | Reddit    |
| 47 | `com.remote4africa.app` | Remote4Africa    |
| 48 | `com.safaricom.mpesa.lifestyle` | M-PESA    |
| 49 | `com.shazam.android` | Shazam    |
| 50 | `com.substack.app` | Substack    |
| 51 | `com.thestepupapp.stepup` | StepUp    |
| 52 | `com.truecaller` | Truecaller    |
| 53 | `com.truedevelopersstudio.automatictap.autoclicker` | Auto Clicker    |
| 54 | `com.whatsapp` | WhatsApp    |
| 55 | `com.xiaomi.midrop` | Mi Drop / ShareMe    |
| 56 | `com.xiaomi.scanner` | Scanner    |
| 57 | `ee.mtakso.client` | Bolt / ride-hailing    |
| 58 | `games.grounded.idleiktah` | Idle Iktah    |
| 59 | `me.proton.android.drive` | Proton Drive    |
| 60 | `net.thunderbird.android` | Thunderbird    |
| 61 | `org.fdroid.fdroid` | F-Droid    |
| 62 | `org.languagetransfer` | Language Transfer    |
| 63 | `org.mozilla.firefox` | Firefox    |
| 64 | `org.thunderdog.challegram` | Challegram (Telegram client)    |
| 65 | `proton.android.meet` | Proton Meet    |
| 66 | `ru.zdevs.zarchiver` | ZArchiver    |
| 67 | `us.zoom.videomeetings` | Zoom    |
| 68 | `wp.wattpad` | Wattpad    |

---

## Section B — System bloat candidates (removal via `pm uninstall --user 0`)

> Items already removed are listed in the Removal log; re-running `pm uninstall` on them returns `Failure [not installed for 0]`.

### Xiaomi / MIUI
| Package | What it is |
|---------|-----------|
| `com.miui.analytics` | MIUI analytics / ad telemetry |
| `com.miui.msa.global` | MIUI System Ads — the ad engine |
| `com.mi.globalbrowser` | Mi Browser |
| `com.mi.appfinder` | App Finder search |
| `com.xiaomi.mipicks` | GetApps / Mi Picks store |
| `com.mi.globalminusscreen` | App Vault (minus-one screen) |
| `com.miui.player` | Mi Music |
| `com.miui.videoplayer` | Mi Video |
| `com.miui.cleaner` | Cleaner |
| `com.miui.fm` | FM Radio |
| `com.miui.fmservice` | FM Radio service |
| `com.miui.yellowpage` | Yellow Pages |
| `com.mi.healthglobal` | Mi Fitness |
| `com.miui.miservice` | Services & feedback |
| `com.miui.bugreport` | Bug report |
| `com.miui.daemon` | MIUI daemon |
| `com.miui.misightservice` | Telemetry |
| `com.miui.thirdappassistant` | Third-party app assistant |
| `com.xiaomi.discover` | Discover |
| `com.xiaomi.aicr` | AI call recording |
| `com.xiaomi.glgm` | GLGM component |
| `com.mi.android.globalFileexplorer` | File Manager |
| `com.miui.qr` | QR code scanner |
| `com.miui.aod` | Always-on display |
| `com.miui.miwallpaper` | Wallpaper |
| `com.longcheertel.cit` | Factory test (CIT) |
| `com.longcheertel.AutoTest` | Factory auto test |
| `com.longcheertel.sarauth` | Factory SAR auth |
| `com.bsp.logmanager` | Log manager |
| `com.miui.extraphoto` | Extra photo component |
| `com.miuix.editor` | Editor component |

### Facebook (preloaded)
`com.facebook.appmanager` · `com.facebook.services` · `com.facebook.system`

### Google (preloaded)
`com.google.android.apps.youtube.music` · `com.google.android.videos` · `com.google.android.apps.tachyon` (Meet) · `com.google.android.apps.safetyhub` · `com.google.android.marvin.talkback` · `com.google.android.accessibility.switchaccess` · `com.android.egg` · `com.android.dreams.basic` · `com.android.dreams.phototable` · `com.google.android.apps.healthdata`

---

## Section C — DO NOT REMOVE

**Android core:** `com.android.systemui` · `com.android.settings` · `com.android.phone` · `com.android.server.telecom` · `com.android.vending` · `com.google.android.permissioncontroller` · `com.android.externalstorage` · `com.android.providers.*`

**Xiaomi core:** `com.miui.home` · `miui.systemui.plugin` · `com.xiaomi.phone` · `com.miui.securitycenter` · `com.lbe.security.miui` · `com.miui.powerkeeper` · `com.miui.cloudservice` · `com.miui.micloudsync` · `com.xiaomi.account` · `com.xiaomi.finddevice` · `com.xiaomi.xmsf` (push — removing breaks notifications) · `com.xiaomi.xmsfkeeper` · `com.miui.core` · `com.miui.system` · `com.miui.notification` · `com.android.thememanager`

**Google core:** `com.google.android.gms` · `com.google.android.gsf` · `com.google.android.googlequicksearchbox` · `com.google.android.dialer` · `com.google.android.contacts` · `com.google.android.apps.messaging` · `com.google.android.apps.photos` · `com.google.android.apps.maps` · `com.google.android.webview` · `com.google.android.inputmethod.latin`

**Hardware / radio (Qualcomm + device):** all `vendor.qti.*` · all `com.qualcomm.*` · `com.qti.*` · `org.codeaurora.ims` · `org.ifaa.aidl.manager` · `com.goodix.fingerprint.setting` · `com.fingerprints.*` · `com.xiaomi.touchservice` · `com.xiaomi.bluetooth` · `com.xiaomi.trustservice` · `com.xiaomi.joyose` · `com.xiaomi.payment` · `com.xiaomi.simactivate.service`

**Overlays:** anything ending in `.overlay`, `.rro.*`, `android.*overlay*` — these are resource overlays; removing them breaks theming/layout.
