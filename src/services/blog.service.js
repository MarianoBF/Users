import http from "../http-common";

class BudgetDataService {
  getAllPosts() {
    return http.get("/users");
  }

  getById(id) {
    return http.get(`/users/${id}`);
  }

  createPost(data) {
    return http.post("/users", data);
  }

  updateById(id, data) {
    return http.put(`/users/${id}`, data);
  }

  deleteById(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new BudgetDataService();
