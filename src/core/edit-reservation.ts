import { Request, Response } from 'express';
import { PostgresClient } from '../db';

interface Reservation {
  reservation_id: number;
  reservation_date: string;
  phone_number: string;
  lastname: string;
}

const addReservation = async (req: Request, res: Response) => {
  const { reservation_date, phone_number, lastname } = req.body;

  if (reservation_date === undefined || phone_number === undefined || lastname === undefined) {
    res.status(400).send({ message: 'Missing required fields' });
    return;
  }

  const reservationsInfo = await PostgresClient.query<Reservation>('SELECT * FROM get_reservation()');
  const reservationsNumber = reservationsInfo.rows.length;

  if (reservationsNumber > 12) {
    res.status(400).send({ message: 'There are no available spots' });
    return;
  }

  await PostgresClient.query(`INSERT INTO reservation(reservation_date, phone_number, lastname) VALUES ('${reservation_date}', ${phone_number}, '${lastname}')`);

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
