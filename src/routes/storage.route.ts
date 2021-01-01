import { Router } from "https://deno.land/x/oak@v6.3.2/mod.ts";
//import { upload } from "https://deno.land/x/oak_upload_middleware@v2/mod.ts";

import StorageCtrl from "../controllers/storage.controller.ts";

const router = new Router();

router.post(
  "/api/upload",
//  upload("uploads", { useCurrentDir: false }),
  StorageCtrl.upload
);

export default router;
