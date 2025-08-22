import { AppRouter, Request } from './app.routers';
import { BoardController } from './modules/board/board.controller';
import { CardController } from './modules/card/card.controller';

export class RouterManager {
  private static instance: RouterManager;
  private appRouter: AppRouter;
  private boardController: BoardController;

  private constructor(boardController: BoardController) {
    this.appRouter = new AppRouter(); // chỉ new một lần
    this.boardController = boardController;

    this.registerBoardRoutes();
  }

  static init(boardController: BoardController): RouterManager {
    if (!RouterManager.instance) {
      RouterManager.instance = new RouterManager(boardController);
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
      return this.boardController.getStarredBoards(userId);
    });

    this.appRouter.addRoute('GET', '/boards/recently', async (req: Request) => {
      const userId = Number(req.params!.userId);
      return this.boardController.getRecentlyBoardsByUser(userId);
    });

    this.appRouter.addRoute(
      'GET',
      '/boards/workspace',
      async (req: Request) => {
        const userId = Number(req.params!.userId);
        const workspaceId = Number(req.params!.workspaceId);
        const membership = req.params!.membership;

        const membershipMap: Record<
          string,
          (u: number, w: number) => Promise<any>
        > = {
          owner: this.boardController.getOwnerBoards.bind(this.boardController),
          member:
            this.boardController.getBoardsWhereUserIsMemberOfWorkspace.bind(
              this.boardController,
            ),
        };

        const fn = membershipMap[membership];
        if (!fn) throw new Error(`Invalid membership type: ${membership}`);

        return fn(userId, workspaceId);
      },
    );

    this.appRouter.addRoute('GET', '/boards/stages', async (req: Request) => {
      const boardId = Number(req.params!.boardId);
      return this.boardController.getStagesofBoard(boardId);
    });
  }
}
