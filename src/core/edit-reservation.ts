import { Request, Response } from 'express';
import { PostgresClient } from '../db';

const addReservation = async (req: Request, res: Response) => {
  const { date, tel, surname } = req.body;

  if (date === undefined || tel === undefined || surname === undefined) {
    res.status(400).send({ message: 'Missing required fields' });
    return;
  }

  await PostgresClient.query(`INSERT INTO reservation(reservation_date, tel, surname) VALUES ('${date}', ${tel}, '${surname}') RETURNING pizza_id`);

  res.status(200).send({ message: 'Reservation added successfully' });
};

const deleteReservation = async (req: Request, res: Response) => {
  const { reservationId } = req.body;
  if (!reservationId) {
    res.status(400).send({ message: 'Missing required fields' });
    return;
  }

  await PostgresClient.query(`DELETE FROM reservation WHERE reservation_id = ${reservationId}`);

  res.status(200).send({ message: 'Reservation deleted successfully' });
};

export { addReservation, deleteReservation };
