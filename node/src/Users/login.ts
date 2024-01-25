export {}; // needed for typescript to not complain about duplicate imports
import express, {Response} from "express";
import type { UserAuthRequest } from "./UserTypes";
const router = express.Router();

router.get("/", (req: UserAuthRequest, res: Response) => {
  if (req.oidc === undefined) {
    res.sendStatus(401);
  } else {
    res.sendStatus(200);
    console.log('success - user creds = ', req.oidc.user);
  }
});

export default router;
