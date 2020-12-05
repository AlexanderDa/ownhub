import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ port, secure, hostname }) => {
  console.clear();
  const client = `${secure ? "https" : "http"}://${
    hostname || "localhost"
  }:${port}`;

  console.log(`\x1b[32m OwnHub is ready! \x1b[0m\n`);
  console.log(`\x1b[1m  Client:     \x1b[0m ${client}`);
});

await app.listen({ port: 3000 });
