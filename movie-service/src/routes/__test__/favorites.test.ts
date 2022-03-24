import request from "supertest";
import { app } from "../../app";

it('it return 200 on successful to fetch favorites list', async () => {
    return request(app)
            .get('/api/favorites')
            .expect(200);
});

it('it return 201 on successful to fetch create a favorite film', async () => {
    return request(app)
            .post('/api/favorites')
            .send({
                id: 1,
                name: "Sunday Odibo"
            })
            .expect(201);
});