import http from "../http-common";

class MovieDataService {
  constructor() {
    this.cache = new Map();
  }

  async getAll() {

    if (this.cache.has(`allMovies`)) {
      return this.cache.get(`allMovies`);
    }

    const response = await http.get("/movies");
    this.cache.set(`allMovies`, response);
    return response;
    // return http.get("/movies");
  }

  get(id) {
    return http.get(`/movies/${id}`);
  }

  create(data) {
    return http.post("/movies", data);
  }

  update(id, data) {
    return http.put(`/movies/${id}`, data);
  }

  delete(id) {
    return http.delete(`/movies/${id}`);
  }

  deleteAll() {
    return http.delete(`/movies`);
  }

  findByTitle(title) {
    return http.get(`/movies?title=${title}`);
  }
}

export default new MovieDataService();