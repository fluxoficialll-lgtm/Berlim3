{ pkgs, ... }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_22
  ];
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "start"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
        cwd = "frontend";
      };
    };
  };
}