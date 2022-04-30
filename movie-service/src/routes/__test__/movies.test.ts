import request from 'supertest';
import { app } from '../../app';

it('it return a 200 on successful getAllMovies', async()=>{
  const token = await global.signin();
    console.log(token)
    await request(app)
            .get('/api/movies')
            .set('Authorization', token)
            .expect(200)
});
