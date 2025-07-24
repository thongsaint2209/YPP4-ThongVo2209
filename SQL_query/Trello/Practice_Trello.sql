-- Homepage
-- Homepage: recently viewed boards
-- Q1: Get recently viewed boards by the current user ?
SELECT b.Id, b.Name
FROM Boards b
JOIN BoardUsers bu ON bu.BoardId = b.Id
WHERE bu.UserId = 1 

-- Homepage: BoardStarred
-- Q2: Count how many stared boards the current user has.
SELECT COUNT(*) AS StaredBoardCount
FROM Boards b
JOIN BoardUsers bu ON bu.BoardId = b.Id
WHERE bu.UserId = 1 AND b.IsStar = 1;

-- Homepage: Board Starred
-- Q3: Get the all starred boards by the user.
SELECT b.Id, b.Name, bu.AccessedAt
FROM Boards b
JOIN BoardUsers bu ON bu.BoardId = b.Id
WHERE bu.UserId = 8 AND b.IsStar = 1

-- Homepage: Workspaces
-- Q4: Get all workspaces the user(id=1) is a member of.
SELECT *
FROM Workspaces w
JOIN Members m ON m.OwnerId = w.Id
WHERE m.OwnerTypeId = 1 AND m.UserId = 1 

-- Homepage: Board, Workspace
-- Q5: Get all boards of workspaces(id=738) the user(id=1) is a member of.
SELECT *
FROM Boards b
JOIN Members m ON m.OwnerId = b.Id
WHERE m.UserId = 1 AND b.WorkspaceId = 738 AND m.OwnerTypeId = 2

-- Template
-- Q6: Get all template categories.
SELECT Id, Name FROM TemplateCategories;

-- Template
-- Q7: Get all templates in a specific category (e.g., 'Business').
SELECT t.Title, t.Description, t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
ORDER BY Viewed DESC

--Template
-- Q8: Get top 5 most viewed templates.
SELECT TOP 5 t.Title, t.Description, t.Copied, t.Viewed, t.BackgroundUrl
FROM Templates t
ORDER BY Viewed DESC

-- Template
-- Q9: Search templates by keyword in title.
SELECT Title
FROM Templates
WHERE Title LIKE '%B%';

-- Template
-- Q10: Search boards by keyword in title.
SELECT b.Name
FROM Boards b
WHERE b.Name LIKE '%An%';



-- Query for another UI
SELECT b.Id, b.Name
FROM Boards AS b
INNER JOIN Members AS bm ON b.Id = bm.UserId

SELECT c.Title, c.Description, s.Title AS StageName
FROM Cards c
INNER JOIN Stages s ON c.StageId = s.Id
WHERE s.BoardId = 1;

--Đếm số lượng card trong mỗi stage của board
SELECT s.Title AS StageName, COUNT(c.Id) AS CardCount
FROM Stages s
LEFT JOIN Cards c ON s.Id = c.StageId
WHERE s.BoardId = 1
GROUP BY s.Title;


SELECT u.Username, COUNT(b.Id) AS BoardCount
FROM Users u
JOIN Boards b ON u.Id = b.CreatedBy
GROUP BY u.Username
ORDER BY BoardCount DESC

SELECT c.CardId, ca.Title AS CardTitle, c.Content, c.CreatedAt
FROM Comments c
JOIN Cards ca ON ca.Id = c.CardId
WHERE c.CreatedAt = (
    SELECT MAX(c2.CreatedAt)
    FROM Comments c2
    WHERE c2.CardId = c.CardId
);

SELECT Name, CreatedAt
FROM Boards
WHERE CreatedAt >= DATEADD(DAY, -7, GETDATE());

--lay card o thang hien tai
SELECT *
FROM Cards
WHERE MONTH(CreatedAt) = MONTH(GETDATE())
  AND YEAR(CreatedAt) = YEAR(GETDATE());