import express from "express";

export const createRouter = () => {
  const router = express.Router();

  router.get("/hello", (_req, res) => res.send("Hello World!"));
  return router;
};
