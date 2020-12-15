import { Router } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import Client from "../controllers/client.controller.tsx";

const router = new Router();

router.get("/", Client.app);

export default router;