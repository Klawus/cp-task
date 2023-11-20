import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DELETE_EPISODE_SCHEMA } from "../schema/commands/deleteEpisode/1.0.0";
import { DELETE_CHARACTER_SCHEMA } from "../schema/commands/deleteCharacter/1.0.0";
import { GET_CHARACTER_SCHEMA } from "../schema/queries/getCharacter/1.0.0";
import { requestHandler } from "../tools/request-handler";
import { UseCaseBus } from "../shared/use-case-bus";
import { CREATE_CHARACTER_SCHEMA } from "../schema/commands/createCharacter/1.0.0";
import { createValidationMiddleware } from "../shared/create-validation-middleware";
import { CreateCharacterUseCase } from "./use-cases/create-character";
import { GetCharacterUseCase } from "./use-cases/get-character";
import { GetCharactersUseCase } from "./use-cases/get-characters";
import { GET_CHARACTERS_SCHEMA } from "../schema/queries/getCharacters/1.0.0";
import { DeleteCharacterUseCase } from "./use-cases/delete-character";
import { CREATE_EPISODE_SCHEMA } from "../schema/commands/createEpisode/1.0.0";
import { CreateEpisodeUseCase } from "./use-cases/create-episode";
import { UPDATE_CHARACTER_SCHEMA } from "../schema/commands/updateCharacter/1.0.0";
import { UpdateCharacterUseCase } from "./use-cases/update-character";
import { DeleteEpisodeUseCase } from "./use-cases/delete-episode";

export interface RoutingDependencies {
  useCaseBus: UseCaseBus;
}

export const createRouter = ({ useCaseBus }: RoutingDependencies) => {
  const router = express.Router();

  router.post(
    "/characters",
    createValidationMiddleware(CREATE_CHARACTER_SCHEMA),
    async (req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.CREATED,
        useCaseBus.handle(new CreateCharacterUseCase({ ...res.locals.input })),
      ),
  );
  router.get(
    "/characters",
    createValidationMiddleware(GET_CHARACTERS_SCHEMA),
    async (req: Request, res: Response) => {
      return requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(new GetCharactersUseCase({ ...res.locals.query })),
      );
    },
  );
  router.get(
    "/characters/:id",
    createValidationMiddleware(GET_CHARACTER_SCHEMA),
    async (req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(
          new GetCharacterUseCase({ id: res.locals.parameter.id }),
        ),
      ),
  );
  router.put(
    "/characters/:id",
    createValidationMiddleware(UPDATE_CHARACTER_SCHEMA),
    async (req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(
          new UpdateCharacterUseCase({
            id: res.locals.parameter.id,
            ...res.locals.input,
          }),
        ),
      ),
  );
  router.delete(
    "/characters/:id",
    createValidationMiddleware(DELETE_CHARACTER_SCHEMA),
    async (req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(
          // TODO: Fix typing
          new DeleteCharacterUseCase({ id: res.locals.parameter.id }),
        ),
      ),
  );
  router.post(
    "/episodes",
    createValidationMiddleware(CREATE_EPISODE_SCHEMA),
    async (req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.CREATED,
        useCaseBus.handle(new CreateEpisodeUseCase({ ...res.locals.input })),
      ),
  );
  router.delete(
    "/episodes/:id",
    createValidationMiddleware(DELETE_EPISODE_SCHEMA),
    async (req: Request, res: Response) =>
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
