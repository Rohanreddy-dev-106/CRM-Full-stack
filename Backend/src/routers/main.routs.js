import express from "express";
import MainControllers from "../controllers/main.controller.js";
import AnalyticsController from "../controllers/analytics.controller.js";
import { authorizeRoles, requireAuth } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
	addNoteBodySchema,
	cardIdParamSchema,
	createCardBodySchema,
	idParamSchema,
	paginationQuerySchema,
	updateCardBodySchema,
	updateChecklistBodySchema
} from "../validation/main.validation.js";

const router = express.Router();
const controller = new MainControllers();
const analyticsController = new AnalyticsController();

router.use(requireAuth);

// ─── Analytics (all roles) ───────────────────────────────────────
router.get("/analytics", authorizeRoles("admin", "manager", "agent"), (req, res, next) => analyticsController.getAnalytics(req, res, next));

// ─── Cards ───────────────────────────────────────────────────────
router.get("/cards", authorizeRoles("admin", "manager", "agent"), validateRequest({ query: paginationQuerySchema }), (req, res, next) => controller.getAllCards(req, res, next));
router.get("/cards/:id", authorizeRoles("admin", "manager", "agent"), validateRequest({ params: idParamSchema }), (req, res, next) => controller.getCardById(req, res, next));
router.post("/cards", authorizeRoles("admin", "manager"), validateRequest({ body: createCardBodySchema }), (req, res, next) => controller.createCard(req, res, next));
router.patch("/cards/:id", authorizeRoles("admin", "manager"), validateRequest({ params: idParamSchema, body: updateCardBodySchema }), (req, res, next) => controller.updateCard(req, res, next));
router.delete("/cards/:id", authorizeRoles("admin", "manager"), validateRequest({ params: idParamSchema }), (req, res, next) => controller.deleteCard(req, res, next));

// ─── Notes ───────────────────────────────────────────────────────
router.post("/cards/:cardId/notes", authorizeRoles("admin", "manager", "agent"), validateRequest({ params: cardIdParamSchema, body: addNoteBodySchema }), (req, res, next) => controller.addNote(req, res, next));
router.get("/cards/:cardId/notes", authorizeRoles("admin", "manager", "agent"), validateRequest({ params: cardIdParamSchema, query: paginationQuerySchema }), (req, res, next) => controller.getNotesByCard(req, res, next));

// ─── Checklist ───────────────────────────────────────────────────
router.get("/cards/:cardId/checklist", authorizeRoles("admin", "manager", "agent"), validateRequest({ params: cardIdParamSchema, query: paginationQuerySchema }), (req, res, next) => controller.getChecklistByCard(req, res, next));
router.patch("/checklist/:id", authorizeRoles("admin", "manager"), validateRequest({ params: idParamSchema, body: updateChecklistBodySchema }), (req, res, next) => controller.updateChecklistStatus(req, res, next));

export default router;