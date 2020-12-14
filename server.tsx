import Application from "./src/application.ts";

const app = new Application({ path: "/home/alexander" });

app.addEventListener("listen", ({ port, secure, hostname }) => {
  console.clear();
  const client = `${secure ? "https" : "http"}://${
    hostname || "localhost"
  }:${port}`;

  console.log(`\x1b[32m OwnHub is ready! \x1b[0m\n`);
  console.log(`\x1b[1m  Client:     \x1b[0m ${client}`);
});

await app.listen({ port: 3000 });
