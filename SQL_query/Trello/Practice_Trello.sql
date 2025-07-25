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

-- Setting
-- Q11: Get setting workspace visibility(value=22)
SELECT svk.KeyName, so.DisplayValue
FROM 
    (SELECT sv.Value, sk.KeyName
    FROM SettingValues sv
    JOIN SettingKeys sk ON sv.SettingKeyId = sk.id
    JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId
    WHERE ot.Value = 'Workspace' AND sk.KeyName = 'workspacevisibility') AS svk
JOIN SettingOptions so ON so.id = svk.Value

-- Setting
-- Get all setting keys of user
SELECT sk.KeyName
FROM SettingKeys sk 
JOIN OwnerTypes ot ON ot.Id = sk.OwnerTypeId
WHERE ot.Value = 'User' 

-- Get all setting keys of user with option value(id=1)
SELECT *
FROM 
        (SELECT sk.KeyName, sv.OwnerId, sk.OwnerTypeId,sv.Value
FROM SettingKeys sk 
LEFT JOIN SettingValues sv ON sk.Id = sv.SettingKeyId) AS sbk
 JOIN OwnerTypes ot ON ot.Id = sbk.OwnerTypeId
    WHERE ot.Value = 'User' AND sbk.OwnerId = 1


-- Member
-- Q12: Get all the members of workkspace(id=13) and with permission
WITH GetUserPermission AS
    (SELECT m.UserId , m.PermissionId
    FROM Members m
    JOIN Workspaces w ON m.OwnerId = w.Id
    WHERE m.OwnerTypeId = 1 AND m.OwnerId = 13)
SELECT u.Username, p.Name
FROM Users u
JOIN GetUserPermission gup ON gup.UserId = u.Id
JOIN Permissions p ON p.Id = gup.PermissionId

-- Member,Sharelink
-- Q13: Get all members of the board with Sharelink(status=Active)
WITH GetShareLinksMember AS 
    (SELECT sl.OwnerId,sl.PermissionId, m.UserId
    FROM ShareLinks sl
    JOIN Members m ON m.OwnerId = sl.OwnerId
    Where m.OwnerTypeId = 2 AND sl.OwnerTypeId = 2 AND  sl.Status ='Active')
SELECT u.Username
FROM GetShareLinksMember gslm
JOIN Users u ON u.Id = gslm.UserId

-- Q17: Get name all power up of board(id=2)
SELECT puc.Name
FROM (SELECT pu.Id
FROM PowerUps pu
JOIN BoardPowerUps bu ON pu.Id = bu.PowerUpId
JOIN Boards b ON b.Id = bu.BoardId
WHERE bu.BoardId = 2) as p
JOIN PowerUpCategories puc ON puc.Id = p.Id

-- Power up
-- Q18: Get name power up(category=2)
SELECT *
FROM PowerUps pu
JOIN PowerUpCategories puc ON pu.PowerUpCategoryId = puc.Id
WHERE puc.id = 2

-- Q20: Get all member of board (id=1)
SELECT b.Id, b.Name
FROM Members AS m
JOIN Boards b ON m.OwnerId = b.Id
WHERE m.OwnerTypeId = 2 AND b.Id=1

-- Q21: Get all card of stage (id=1)
SELECT c.Title, c.Description, s.Title AS StageName
FROM Cards c
JOIN Stages s ON c.StageId = s.Id
WHERE s.Id = 1;

-- Q22: Count card of stage(id=1)
SELECT s.Title AS StageName, COUNT(*) AS CardCount
FROM Stages s
JOIN Cards c ON s.Id = c.StageId
WHERE s.Id = 1
GROUP BY s.Title;

-- Q23: Count board user create by and sort desc 
SELECT u.Username, COUNT(*) AS BoardCount
FROM Users u
JOIN Boards b ON u.Id = b.CreatedBy
GROUP BY u.Username
ORDER BY BoardCount DESC

-- Q24: Get comment lastest each card
SELECT c.CardId, ca.Title AS CardTitle, c.Content, c.CreatedAt
FROM Comments c
JOIN Cards ca ON ca.Id = c.CardId
WHERE c.CreatedAt = (
    SELECT MAX(c2.CreatedAt)
    FROM Comments c2
    WHERE c2.CardId = c.CardId
);

-- Q25: Get boards are created 7 days lastest
SELECT Name, CreatedAt
FROM Boards
WHERE CreatedAt >= DATEADD(DAY, -7, GETDATE());

-- Q26: Get all cards are created on current month, year
SELECT *
FROM Cards
WHERE MONTH(CreatedAt) = MONTH(GETDATE())
  AND YEAR(CreatedAt) = YEAR(GETDATE());