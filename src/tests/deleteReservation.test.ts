import axios from 'axios';
import { randomString } from './utils';

describe('test delete reservation', () => {
  it('should return 401 if no token was provided', async () => {
    await axios
      .post('http://localhost:3001/admin/delete-reservation', {
        reservationId: 1,
      })
      .catch((err) => {
        expect(err.response.status).toBe(401);
        expect(err.response.data.message).toEqual('Authorization failed');
      });
  });

  it('should return 400 if no data was provided', async () => {
    const token = await axios.post('http://localhost:3001/admin/login', {
      username: 'admin1',
      password: 'admin1',
    });
    await axios
      .post(
        'http://localhost:3001/admin/delete-reservation',
        {},
        { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
      )
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.message).toEqual('Missing required fields');
      });
  });

  it('should return 200 on delete reservation', async () => {
    const token = await axios.post('http://localhost:3001/admin/login', {
      username: 'admin1',
      password: 'admin1',
    });
    // Add reservation
    await axios.post('http://localhost:3001/admin/add-reservation', {
      lastname: randomString(10),
      phone_number: '123456789',
      reservation_date: '2023-06-26',
    });
    //Get all reservations
    const reservations = await axios.get(
      'http://localhost:3001/admin/reservation'
    );
    const lastReservation = reservations.data[reservations.data.length - 1];
    const res = await axios.post(
      'http://localhost:3001/admin/delete-reservation',
      {
        reservationId: lastReservation.reservation_id,
      },
      { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
    );
    expect(res.status).toBe(200);
    expect(res.data.message).toEqual('Reservation deleted successfully');
  });
});
