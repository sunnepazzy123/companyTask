import request from "supertest";
import { app } from "../../app";

it('it return 200 on successful to fetch film list', async () => {
    return request(app)
            .get('/api/films')
            .expect(200);
});

it('it return 200 on successful to fetch a film detail', async () => {
    return request(app)
            .get(`/api/films/1`)
            .expect(200);
});