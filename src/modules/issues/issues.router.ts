import { Router } from "express";
import auth from "../../middleware/auth";
import { issueController } from "./issues.controller";
import { UseRole } from "../../types";

const router = Router()

router.post('/',auth(UseRole.contributor, UseRole.maintainer),issueController.createIssue);
router.get('/', issueController.getAllIssues);
router.get("/:id", issueController.getSingleIssue);
router.patch("/:id",auth(UseRole.contributor, UseRole.maintainer),issueController.updateIssue)
router.delete("/:id",auth(UseRole.maintainer), issueController.deleteIssue)

export const  issueRouter=router;