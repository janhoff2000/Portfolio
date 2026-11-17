import SwiftUI

@main
struct ReviewRadarApp: App {
    @State private var store: PRStore

    // Without this, every Xcode preview adds another icon to the menu bar.
    private static let isRunningForPreviews = ProcessInfo.processInfo.environment["XCODE_RUNNING_FOR_PREVIEWS"] == "1"
    // The tests run inside the app, and must not call GitHub or Jira with the real tokens.
    private static let isRunningTests = ProcessInfo.processInfo.environment["XCTestConfigurationFilePath"] != nil

    init() {
        #if DEBUG
        let store = Self.sampleStore() ?? PRStore()
        #else
        let store = PRStore()
        #endif
        _store = State(initialValue: store)
        #if DEBUG
        if let dir = UserDefaults.standard.string(forKey: "snapshotDir") {
            Self.snapshot(store: .preview(), to: URL(fileURLWithPath: dir))
            return
        }
        #endif
        // Started here, not from a view, because the menu bar label is not a view that stays on screen
        // and the panel only exists while it is open.
        if !Self.isRunningForPreviews, !Self.isRunningTests {
            // Set up before anything else: a click on a notification can be what launches the app.
            let notifier = Notifier()
            notifier.onOpen = { [store] prID in store.markAllCommentsRead(of: prID) }
            store.notifier = notifier
            Task { await store.runBackgroundRefresh() }
        }
    }

    var body: some Scene {
        MenuBarExtra(isInserted: .constant(!Self.isRunningForPreviews)) {
            MyPRsPanel()
                .environment(store)
        } label: {
            MenuBarLabel(store: store)
        }
        .menuBarExtraStyle(.window)

        SwiftUI.Settings {
            SettingsView()
                .environment(store)
        }
        // Keeps the window within the height limits SettingsView sets.
        .windowResizability(.contentSize)
    }
}

#if DEBUG
extension ReviewRadarApp {
    /// Launch a debug build with `-sampleData YES` to try the menu bar and the panel without connected
    /// repositories. The lists are sample data and no server is called; everything else, Settings included,
    /// works as usual. `-sampleError YES` shows the look when the lists can't load.
    fileprivate static func sampleStore() -> PRStore? {
        let defaults = UserDefaults.standard
        guard defaults.bool(forKey: "sampleData") else { return nil }
        return .sample(error: defaults.bool(forKey: "sampleError") ? .offline : nil)
    }
}
#endif

#if DEBUG
import AppKit
extension ReviewRadarApp {
    static func snapshot(store: PRStore, to dir: URL) {
        FileHandle.standardError.write("snapshot start \(dir.path)\n".data(using: .utf8)!)
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            var windows: [NSWindow] = []
            for (appearanceName, tag) in [(NSAppearance.Name.aqua, "light"), (.darkAqua, "dark")] {
                for (scope, scopeTag) in [(MyPRsPanel.Scope.mine, "mine"), (.reviews, "reviews")] {
                    let host = NSHostingView(rootView: MyPRsPanel(scope: scope).environment(store).background(Color(nsColor: .windowBackgroundColor)))
                    host.appearance = NSAppearance(named: appearanceName)
                    let size = host.fittingSize
                    let win = NSWindow(contentRect: NSRect(x: -5000, y: -5000, width: size.width, height: size.height), styleMask: [.borderless], backing: .buffered, defer: false)
                    win.appearance = NSAppearance(named: appearanceName)
                    win.contentView = host
                    windows.append(win)
                    DispatchQueue.main.asyncAfter(deadline: .now() + 2.5 + Double(windows.count)) {
                        win.setFrameOrigin(NSPoint(x: 200, y: 200))
                        win.orderFrontRegardless()
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) {
                            let p = Process()
                            p.executableURL = URL(fileURLWithPath: "/usr/sbin/screencapture")
                            p.arguments = ["-x", "-o", "-l", String(win.windowNumber), dir.appendingPathComponent("rr-\(scopeTag)-\(tag).png").path]
                            try? p.run(); p.waitUntilExit()
                            win.orderOut(nil)
                        }
                    }
                }
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 9.0) { _ = windows; exit(0) }
        }
    }
}
#endif
