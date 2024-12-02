import { get } from 'http';
import prisma from '../prisma';
import { Request, Response } from 'express';


export const addUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, coment } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      coment,
    },
  });
  res.json(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
