import { Injectable } from '@nestjs/common';
import { Workspace } from '../workspace/entities/workspace.entity';
import { Board } from '../boards/entities/board.entity';

@Injectable()
export class DatabaseFunctionService {
  // // Mock workspace data
  // private workspaces: Workspace[] = [
  //   new Workspace(
  //     1,
  //     'Frontend Team',
  //     'Workspace for frontend developers',
  //     10,
  //     new Date(),
  //     1001,
  //     new Date(),
  //     2001,
  //     'https://logo.com/frontend.png',
  //   ),
  //   new Workspace(
  //     2,
  //     'Backend Team',
  //     'Workspace for backend developers',
  //     20,
  //     new Date(),
  //     1002,
  //     new Date(),
  //     2002,
  //     'https://logo.com/backend.png',
  //   ),
  // ];

  // // Mock board data
  // private boards: Board[] = [
  //   new Board(
  //     1,
  //     'Board 1',
  //     'Description for Board 1',
  //     new Date(),
  //     1001,
  //     'https://bg1.com/image.png',
  //     1,
  //     'active',
  //     new Date(),
  //     1001,
  //   ),
  //   new Board(
  //     2,
  //     'Board 2',
  //     'Description for Board 2',
  //     new Date(),
  //     1002,
  //     'https://bg2.com/image.png',
  //     1,
  //     'archived',
  //     new Date(),
  //     1002,
  //   ),
  // ];

  join<L, R>(
    left: L[],
    right: R[],
    keySelector: (leftItem: L, rightItem: R) => boolean,
  ): Array<[L, R]> {
    const result: Array<[L, R]> = [];

    for (let leftItem of left) {
      for (let rightItem of right) {
        if (keySelector(leftItem, rightItem)) {
          result.push([leftItem, rightItem]);
        }
      }
    }

    return result;
  }

  leftjoin<L, R>(
    left: L[],
    right: R[],
    keySelector: (leftItem: L, rightItem: R) => boolean,
  ): Array<[L, R | null]> {
    const result: Array<[L, R | null]> = [];

    for (let leftItem of left) {
      let matched = false;

      for (let rightItem of right) {
        if (keySelector(leftItem, rightItem)) {
          result.push([leftItem, rightItem]);
          matched = true;
        }
      }

      if (!matched) {
        result.push([leftItem, null]);
      }
    }

    return result;
  }
}
