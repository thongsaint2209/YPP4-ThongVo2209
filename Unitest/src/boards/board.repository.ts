// boards.repository.ts
import { CreateBoardDto } from './dto/create-board.dto';

export class BoardRepository {
  private mockData: any[] = [];

  create(board: CreateBoardDto) {
    // SQL thuần
    const sql = `INSERT INTO Boards (Title, WorkspaceName) VALUES ('${board.title}', '${board.workspaceName}')`;
    console.log('Executing SQL:', sql);

    // Mock insert
    const newBoard = {
      id: this.mockData.length + 1,
      title: board.title,
      workspaceName: board.workspaceName,
    };
    this.mockData.push(newBoard);

    return newBoard;
  }

  findAll() {
    return this.mockData;
  }
}
