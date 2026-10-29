# iOS simulator build

This project packages the Vite app in a Capacitor iOS shell. The simulator build is unsigned and is for Xcode Simulator only; it is not a device-installable IPA or a TestFlight upload.

## Build locally

Use Node.js 22 or later and Xcode 26 or later:

```sh
npm ci
npm run build
npm run ios:sync
xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Release -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
```

The GitHub Actions workflow runs on pushes to `canvas` and `main`, and can also be started manually from Actions. It uploads `Memery-iOS-Simulator.app.zip` as a workflow artifact for 14 days.

To distribute an installable IPA later, configure an Apple Developer team, signing certificate, provisioning profile, and the matching bundle identifier in the Xcode project and GitHub Actions secrets.
