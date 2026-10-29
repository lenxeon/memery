# iOS device IPA for Sideloadly

This project packages the Vite app in a Capacitor iOS shell. GitHub Actions creates a standard `Payload/App.app` IPA with code signing disabled. It is intended to be opened in Sideloadly, which signs the IPA with the Apple ID you choose and installs it on a connected iPhone. The downloaded IPA is not itself signed and cannot be installed directly.

## Build locally

Use Node.js 22 or later and Xcode 26 or later:

```sh
npm ci
npm run build
npm run ios:sync
xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Release -destination 'generic/platform=iOS' -archivePath "$TMPDIR/Memery.xcarchive" CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=NO archive
mkdir -p "$TMPDIR/Payload"
ditto "$TMPDIR/Memery.xcarchive/Products/Applications/App.app" "$TMPDIR/Payload/App.app"
(cd "$TMPDIR" && zip -qry Memery-Unsigned.ipa Payload)
```

The GitHub Actions workflow runs on pushes to `canvas` and `main`, and can also be started manually from Actions. It uploads `Memery-Unsigned.ipa` as a workflow artifact for 14 days.

Sideloadly signs the IPA on the installation computer. With a free Apple account, sideloaded apps may need to be refreshed every 7 days; a paid Apple Developer account extends this to up to a year. For TestFlight or App Store distribution, use a distribution-signed archive and App Store Connect export instead.
