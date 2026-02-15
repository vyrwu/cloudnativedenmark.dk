{
  description = "Cloud Native Denmark development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Platform-specific packages
        darwinPackages = with pkgs; pkgs.lib.optionals pkgs.stdenv.isDarwin [
          cocoapods
          xcbuild
        ];

        linuxPackages = with pkgs; pkgs.lib.optionals pkgs.stdenv.isLinux [
          android-studio
        ];
      in
      {
        devShells.default = pkgs.mkShell {
          name = "cloudnativedenmark-dev";

          buildInputs = with pkgs; [
            # Core tools
            nodejs_24
            yarn-berry
            zsh
            git

            # Expo / React Native
            watchman

            # Firebase CLI
            firebase-tools
          ] ++ darwinPackages ++ linuxPackages;

          shellHook = ''
            echo ""
            echo "🚀 Cloud Native Denmark development environment"
            echo "🐚 Zsh version: $(zsh --version)"
            echo "📦 Node.js version: $(node --version)"
            echo "🧶 Yarn version: $(yarn --version)"
            echo ""
            echo "📱 Web commands:"
            echo "  yarn web:dev       # Start website dev server"
            echo "  yarn web:build     # Build website for production"
            echo "  yarn web:test      # Run website tests"
            echo ""
            echo "📲 Mobile commands:"
            echo "  yarn mobile:start  # Start Expo dev server"
            echo "  yarn mobile:ios    # Run on iOS Simulator"
            echo "  yarn mobile:android # Run on Android Emulator"
            echo "  yarn mobile:test   # Run mobile tests"
            echo ""
            echo "🔧 Shared commands:"
            echo "  yarn shared:test   # Run shared package tests"
            echo "  yarn test          # Run all tests"
            echo "  yarn typecheck     # TypeScript check all packages"
            echo ""

            exec ${pkgs.zsh}/bin/zsh
          '';

          # Environment variables
          NODE_ENV = "development";

          # Prevent npm/yarn from sending telemetry
          YARN_ENABLE_TELEMETRY = "0";
          NPM_CONFIG_FUND = "false";
          NPM_CONFIG_AUDIT = "false";

          # Expo
          EXPO_NO_TELEMETRY = "1";
        };
      }
    );
}
