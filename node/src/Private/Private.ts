export {}; // needed for typescript to not complain about duplicate imports
import express, {Request, Response} from "express";
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('This is a private route, and if you\'re seeing this, you\'ve been authenticated!');
});

export default router;