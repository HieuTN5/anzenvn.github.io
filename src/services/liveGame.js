import { request } from 'umi';

export function getListGame() {
  return request(`${APP_API}/user/game-categories`, {
    method: 'POST',
  });
}

export function playGame(params) {
  return request(`${APP_API}/user/live-game`, {
    method: 'POST',
    data: params,
  });
}
