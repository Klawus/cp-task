import express from "express";

export interface RoutingDependencies {
  charactersRouting: express.Router;
  episodesRouting: express.Router;
}

export const createRouter = ({
  charactersRouting,
  episodesRouting,
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/characters", charactersRouting);
  router.use("/episodes", episodesRouting);

  return router;
};
