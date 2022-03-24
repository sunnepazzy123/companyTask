import request from 'supertest';
import { app } from '../../app';

it('it return a 201 on successful signUp', async()=>{
    return request(app)
            .post('/api/auth')
            .send(
                {
                    id: 125,
                    role: "basic",
                    name: "Sunday Jun",
                    username: "sunday-thomas",
                    password: "12345",
                  }
            )
            .expect(201)
});

it('it return a 400 on username with character less than 4 and more ', async()=>{
    return request(app)
            .post('/api/auth')
            .send(
                {
                    id: 125,
                    role: "basic",
                    name: "Sunday Jun",
                    username: "su",
                    password: "12345",
                  }
            )
            .expect(400)
});

it('it return a 400 on password with character less than 4 and more 20', async()=>{
    return request(app)
            .post('/api/auth')
            .send(
                {
                    id: 125,
                    role: "basic",
                    name: "Sunday Jun",
                    username: "surname",
                    password: "12",
                  }
            )
            .expect(400)
});

it('it return a 400 with missing username and password', async()=>{
    await request(app)
            .post('/api/auth')
            .send({})
            .expect(400)
});

it('it return a 400 with duplicated username', async()=>{
    await request(app)
            .post('/api/auth')
            .send({
                    id: 125,
                    role: "basic",
                    name: "Sunday Jun",
                    username: "sunday-thomas",
                    password: "12345"
            })
    await request(app)
            .post('/api/auth')
            .send({
                    id: 125,
                    role: "basic",
                    name: "Sunday Jun",
                    username: "sunday-thomas",
                    password: "12345"
            })
            .expect(400);
});