import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://297349.simplecloud.ru/api/',
});

export const uralsibAPI = {
  getUser(id) {
    return instance.get(`users/${id}`);
  },
  createUser(user) {
    return instance.post(`users/`, user);
  },
  updateUser(user) {
    return instance.put(`users/`, user);
  },
  pressButton() {
    return instance.post('stats/press_btn');
  },
  endGame() {
    return instance.post('stats/end_game/');
  },
};
