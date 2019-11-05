import Service from "@/assets/js/service";

export default {
  test(data) {
    return Service.get("/test", data);
  },
  demo(data) {
    return Service.get("/demo", data);
  },
  login(data) {
    return Service.post("/login", data);
  }
};
