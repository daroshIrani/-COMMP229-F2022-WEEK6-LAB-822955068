import {Router} from "express";
import { processLogin, processLogout, processRegistration } from "../../controllers/api/auth-api.controller.server.js";

const router = Router();


// three endpoints for the routes and they will return JSON objects not HTML renders
router.post('/login', processLogin);
router.post('/register', processRegistration);

router.get('/logout', processLogout);
////


export default router;