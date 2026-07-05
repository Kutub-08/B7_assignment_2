import type { NextFunction, Request, Response } from "express";
import type { IUser } from "./issues.interface";
import { issueService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  try {
    const result = await issueService.createIssueIntoDB(req.body, user);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    next(error);

  }
};


const getAllIssues = async (req: Request, res: Response, next: NextFunction) => {
  const { sort, type, status } = req.query;
  try {
    const result = await issueService.getAllIssuesFromDB(
      sort as string,
      type as string,
      status as string,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue retrived successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};


const getSingleIssue = async (req: Request, res:Response, next:NextFunction,
) => {
  const id = req.params.id;
  try {
    const result = await issueService.getSingleIssueFromDB(id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue retrived successfully",
      data: result,
    });
    
  } catch (error: any) {
    next(error);
    
  }
};


const updateIssue = async (req: Request, res: Response, next: NextFunction) => {
  const { role, id: userId } = req.user as IUser;

  const id = req.params.id;

  try {
    const result = await issueService.updateIssueIntoDB(
      id as string,
      userId,
      role,
      req.body,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      error: Error,
    });
  } catch (error: any) {
    next(error);
  }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const result = await issueService.deleteIssueFromDB(id as string);
    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found to delete",
        error: Error,
      });
    }
    sendResponse(res, {
      statusCode: 204,
      success: true,
      message: "Issue Deleted successfully",
    });
  } catch (error: any) {
    next(error);
  }
};


export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue
}