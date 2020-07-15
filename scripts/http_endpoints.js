import http from "k6/http";
import { check, group, sleep } from "k6";

export let options = {
    stages: [
        { duration: "5m", target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: "10m", target: 100 }, // stay at 100 users for 10 minutes
        { duration: "5m", target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'health is ok': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    }
};

const BASE_URL = 'https://localhost';
const HEALTH_ENDPOINT = '/api/health';

export default () => {
    // Make request to health api endpoint
    let healthRes = http.get(`${BASE_URL}${HEALTH_ENDPOINT}`);

    // Verify response
    check(healthRes, {
        'status is 200': (resp) => resp.status === 200,
        //'health is ok': (resp) => resp.json().success === true
    });

    sleep(1);
}
