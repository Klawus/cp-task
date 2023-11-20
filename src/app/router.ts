import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GET_CHARACTER_SCHEMA } from "../schema/queries/getCharacter/1.0.0";
import { requestHandler } from "../tools/request-handler";
import { UseCaseBus } from "../tools/use-case-bus";
import { CREATE_CHARACTER_SCHEMA } from "../schema/commands/createCharacter/1.0.0";
import { createValidationMiddleware } from "../tools/create-validation-middleware";
import { CreateCharacterUseCase } from "./use-cases/create-character/use-case";
import { GetCharacterUseCase } from "./use-cases/get-character/use-case";
import { UUID } from "./value-objects/uuid";
import { GetCharactersUseCase } from "./use-cases/get-characters/use-case";
import { GET_CHARACTERS_SCHEMA } from "../schema/queries/getCharacters/1.0.0";

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
        useCaseBus.handle(new CreateCharacterUseCase({ ...req.body })),
      ),
  );
  router.get(
    "/characters",
    createValidationMiddleware(GET_CHARACTERS_SCHEMA),
    async (req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(
          // TODO: Fix typing
          new GetCharactersUseCase({ ...({ ...req.query } as any) }),
        ),
      ),
  );
  router.get(
    "/characters/:id",
    createValidationMiddleware(GET_CHARACTER_SCHEMA),
    async (req: Request, res: Response) =>
      requestHandler(
        res,
        StatusCodes.OK,
        useCaseBus.handle(
          // TODO: Fix typing
          new GetCharacterUseCase({ id: req.params.id as unknown as UUID }),
        ),
      ),
  );

  return router;
};
