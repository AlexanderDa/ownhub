import { Router } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import StorageCtrl from "../controllers/storage.controller.ts";
import { uploader } from "../middlewares/upload.middlerare.ts";

const router = new Router();

router.post("/api/upload/:path*", uploader(), StorageCtrl.upload);

export default router;
