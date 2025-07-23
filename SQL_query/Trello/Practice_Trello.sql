SELECT *
FROM Activities AS a
INNER JOIN Users as u ON a.UserId = u.Id

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