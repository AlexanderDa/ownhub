import { Router } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import DirectoryCtrl from "../controllers/directory.controller.ts";

const router = new Router();

router.get("/api/directory", DirectoryCtrl.list);
router.post("/api/directory", DirectoryCtrl.create);

export default router;
