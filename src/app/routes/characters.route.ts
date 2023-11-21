import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UseCaseBus } from "../../shared/use-case-bus";
import { requestHandler } from "../../tools/request-handler";
import { createValidationMiddleware } from "../../shared/create-validation-middleware";
import { DELETE_CHARACTER_SCHEMA } from "../../schema/commands/deleteCharacter/1.0.0";
import { GET_CHARACTER_SCHEMA } from "../../schema/queries/getCharacter/1.0.0";
import { CREATE_CHARACTER_SCHEMA } from "../../schema/commands/createCharacter/1.0.0";
import { CreateCharacterUseCase } from "../use-cases/create-character";
import { GetCharacterUseCase } from "../use-cases/get-character";
import { GetCharactersUseCase } from "../use-cases/get-characters";
import { GET_CHARACTERS_SCHEMA } from "../../schema/queries/getCharacters/1.0.0";
import { DeleteCharacterUseCase } from "../use-cases/delete-character";
import { UPDATE_CHARACTER_SCHEMA } from "../../schema/commands/updateCharacter/1.0.0";
import { UpdateCharacterUseCase } from "../use-cases/update-character";

export interface CharactersRoutingDependencies {
  useCaseBus: UseCaseBus;
}

export const charactersRouting = ({
  useCaseBus,
}: CharactersRoutingDependencies) => {
  const router = express.Router();

  router.post(
    "/",
    createValidationMiddleware(CREATE_CHARACTER_SCHEMA),
    async (_req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.CREATED,
        useCaseBus.handle(new CreateCharacterUseCase({ ...res.locals.input })),
      ),
  );
  router.get(
    "/",
    createValidationMiddleware(GET_CHARACTERS_SCHEMA),
    async (_req: Request, res: Response) => {
      return requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(new GetCharactersUseCase({ ...res.locals.query })),
      );
    },
  );
  router.get(
    "/:id",
    createValidationMiddleware(GET_CHARACTER_SCHEMA),
    async (_req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(
          new GetCharacterUseCase({ id: res.locals.parameter.id }),
        ),
      ),
  );
  router.put(
    "/:id",
    createValidationMiddleware(UPDATE_CHARACTER_SCHEMA),
    async (_req: Request, res: Response) =>
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
    "/:id",
    createValidationMiddleware(DELETE_CHARACTER_SCHEMA),
    async (_req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(
          new DeleteCharacterUseCase({ id: res.locals.parameter.id }),
        ),
      ),
  );

  return router;
};
