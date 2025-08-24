import { AppRouter, Request } from './app.routers';
import { Container } from './DI/container';
import { BoardController } from './modules/board/board.controller';
import { CardController } from './modules/card/card.controller';

export class RouterManager {
  private static instance: RouterManager;
  private appRouter: AppRouter;

  private constructor() {
    this.appRouter = new AppRouter();

    this.registerBoardRoutes();
  }

  static init(): RouterManager {
    if (!RouterManager.instance) {
      RouterManager.instance = new RouterManager();
    }
    return RouterManager.instance;
  }

  static getRouter(): AppRouter {
    if (!RouterManager.instance) {
      throw new Error('RouterManager is not initialized');
    }
    return RouterManager.instance.appRouter;
  }

  private registerBoardRoutes() {
    this.appRouter.addRoute('GET', '/boards/starred', async (req: Request) => {
      const userId = Number(req.params!.userId);
      const boardController = Container.resolve(BoardController);
      return boardController.getStarredBoards(userId);
    });

    this.appRouter.addRoute('GET', '/boards/recently', async (req: Request) => {
      const userId = Number(req.params!.userId);
      const boardController = Container.resolve(BoardController);
      return boardController.getRecentlyBoardsByUser(userId);
    });

    this.appRouter.addRoute(
      'GET',
      '/boards/workspace',
      async (req: Request) => {
        const userId = Number(req.params!.userId);
        const workspaceId = Number(req.params!.workspaceId);
        const membership = req.params!.membership;
        const boardController = Container.resolve(BoardController);

        const membershipMap: Record<
          string,
          (u: number, w: number) => Promise<any>
        > = {
          owner: boardController.getOwnerBoards.bind(boardController),
          member:
            boardController.getBoardsWhereUserIsMemberOfWorkspace.bind(
              boardController,
            ),
        };

        const fn = membershipMap[membership];
        if (!fn) throw new Error(`Invalid membership type: ${membership}`);

        return fn(userId, workspaceId);
      },
    );

    this.appRouter.addRoute('GET', '/boards/stages', async (req: Request) => {
      const boardId = Number(req.params!.boardId);
      const boardController = Container.resolve(BoardController);
      return boardController.getStagesofBoard(boardId);
    });
  }
}
