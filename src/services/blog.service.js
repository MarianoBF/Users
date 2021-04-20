import http from "../http-common";

class BudgetDataService {
  getAllPosts() {
    return http.get("/posts");
  }

  getById(id) {
    return http.get(`/posts/${id}`);
  }

  createPost(data) {
    return http.post("/posts", data);
  }

  updateById(id, data) {
    return http.put(`/posts/${id}`, data);
  }

  deleteById(id) {
    return http.delete(`/posts/${id}`);
  }
}

export default new BudgetDataService();
