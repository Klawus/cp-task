import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UseCaseBus } from "../../shared/use-case-bus";
import { requestHandler } from "../../tools/request-handler";
import { GET_EPISODES_SCHEMA } from "../../schema/queries/getEpisodes/1.0.0";
import { DELETE_EPISODE_SCHEMA } from "../../schema/commands/deleteEpisode/1.0.0";
import { CREATE_EPISODE_SCHEMA } from "../../schema/commands/createEpisode/1.0.0";
import { DeleteEpisodeUseCase } from "../use-cases/delete-episode";
import { GetEpisodesUseCase } from "../use-cases/get-episodes";
import { CreateEpisodeUseCase } from "../use-cases/create-episode";
import { createValidationMiddleware } from "../../shared/create-validation-middleware";

export interface EpisodesRoutingDependencies {
  useCaseBus: UseCaseBus;
}

export const episodesRouting = ({
  useCaseBus,
}: EpisodesRoutingDependencies) => {
  const router = express.Router();

  router.post(
    "/",
    createValidationMiddleware(CREATE_EPISODE_SCHEMA),
    async (_req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.CREATED,
        useCaseBus.handle(new CreateEpisodeUseCase({ ...res.locals.input })),
      ),
  );
  router.get(
    "/",
    createValidationMiddleware(GET_EPISODES_SCHEMA),
    async (_req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(new GetEpisodesUseCase({ ...res.locals.query })),
      ),
  );
  router.delete(
    "/:id",
    createValidationMiddleware(DELETE_EPISODE_SCHEMA),
    async (_req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(
          new DeleteEpisodeUseCase({ id: res.locals.parameter.id }),
        ),
      ),
  );

  return router;
};
