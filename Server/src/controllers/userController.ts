import { Request, Response } from 'express';
import prisma from '../prisma';

export const addUser = async (req: Request, res: Response) : Promise<void>  => {
  console.log(req.body);
  const { name, coment } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        coment,
      },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add user.' });
  }
};

export const getAllUsers = async (req: Request, res: Response) : Promise<void>  => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

export const deleteUser = async (req: Request, res: Response) : Promise<void>  => {
  const id = req.params.id;
  console.log(id)
  if (!id) {
    res.status(400).json({ error: 'Не указан ID пользователя.' });
    return 
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Пользователь успешно удалён', deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось удалить пользователя.' });
  }
};