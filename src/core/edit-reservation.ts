import { Request, Response } from 'express';
import { PostgresClient } from '../db';

interface Reservation {
  reservation_id: number;
  reservation_date: string;
  tel: string;
  surname: string;
}

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

const getReservation = async (req: Request, res: Response) => {
  const reservationsInfo = await PostgresClient.query<Reservation>('SELECT * FROM get_reservation()');
  
  const reservations: Reservation[] = reservationsInfo.rows;
  
  return res.json(reservations).status(200);
};

export { addReservation, deleteReservation, getReservation };
