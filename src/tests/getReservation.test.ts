import axios from 'axios';

describe('test get reservation', () => {
  it('should return array of reservations', async () => {
    const res = await axios.get('http://localhost:3001/admin/reservation');
    expect(res.status).toBe(200);
    expect(res.data).toEqual(expect.any(Array));
  });
});
