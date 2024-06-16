import { Request, Response } from "express";

export const returnDate = async (req: Request, res: Response) => {
  try {
    const dateString = "20240615204225";
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1;
    const day = parseInt(dateString.slice(6, 8), 10);
    const hour = parseInt(dateString.slice(8, 10), 10);
    const minute = parseInt(dateString.slice(10, 12), 10);
    const second = parseInt(dateString.slice(12, 14), 10);
    const date = new Date(year, month, day, hour, minute, second);
    res.json(date.getTime()).status(200);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error").status(500);
  }
};
