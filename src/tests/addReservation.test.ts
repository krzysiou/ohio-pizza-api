/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { randomString } from './utils';

describe('test add reservation', () => {
  it('should return 400 if no data was provided', async () => {
    await axios
      .post('http://localhost:3001/admin/add-reservation', {})
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.message).toEqual('Missing required fields');
      });
  });

  it('should return 400 if there is no spots available', async () => {
    const RESTAURANT_CAPACITY = 12;
    // Delete all reservations
    const token = await axios.post('http://localhost:3001/admin/login', {
      username: 'admin1',
      password: 'admin1',
    });
    const res = await axios.get('http://localhost:3001/admin/reservation');
    await Promise.all(
      res.data.map(
        async (r: any) =>
          await axios.post(
            'http://localhost:3001/admin/delete-reservation',
            {
              reservationId: r.reservation_id,
            },
            { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
          )
      )
    );

    // Add reservations to fill restaurant
    await Promise.all(
      [...Array(RESTAURANT_CAPACITY)].map(async () => {
        await axios.post('http://localhost:3001/admin/add-reservation', {
          lastname: randomString(10),
          phone_number: '123456789',
          reservation_date: '2023-06-26',
        });
      })
    );

    // Try to add another reservation
    await axios
      .post('http://localhost:3001/admin/add-reservation', {
        lastname: randomString(10),
        phone_number: '123456789',
        reservation_date: '2023-06-26',
      })
      .catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.message).toEqual(
          'There are no available spots'
        );
      });
  });

  it('should return 200 if data is valid', async () => {
    // Delete all reservations
    const token = await axios.post('http://localhost:3001/admin/login', {
      username: 'admin1',
      password: 'admin1',
    });
    const reservations = await axios.get(
      'http://localhost:3001/admin/reservation'
    );
    await Promise.all(
      reservations.data.map(
        async (r: any) =>
          await axios.post(
            'http://localhost:3001/admin/delete-reservation',
            {
              reservationId: r.reservation_id,
            },
            { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
          )
      )
    );

    const res = await axios.post(
      'http://localhost:3001/admin/add-reservation',
      {
        lastname: randomString(10),
        phone_number: '123456789',
        reservation_date: '2023-06-26',
      },
      { headers: { Authorization: `Bearer ${token.data.accessToken}` } }
    );
    expect(res.status).toBe(200);
    expect(res.data.message).toEqual('Reservation added successfully');
  });
});
