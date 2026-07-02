import type { Request, Response } from "express";

const createUser = async (req : Request, res : Response) =>{

  try {
    const result = 
    }
    
  } catch (error : any) {
    res.status(500).json({

      success : false,
      message : error.message,
      error : error,

    })
  }


export const authController = {
  createUser,
}