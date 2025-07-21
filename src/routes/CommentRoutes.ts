import { Router } from "express";
import { CommentController } from "../Controller/commentController";
import {AuthMiddleware} from '../middleware/AuthMiddleware';
const router: Router = Router();
const controller = new CommentController()

router.post('/usuarios', AuthMiddleware, controller.inserir);
router.get('/usuarios/:id', AuthMiddleware ,controller.encontrarPorId);
router.get('/usuarios', AuthMiddleware ,controller.listarTodos);
router.put('/usuarios/:id', AuthMiddleware ,controller.atualizar);
router.delete('/usuarios/:id', AuthMiddleware ,controller.deletar);
 
export default router;
