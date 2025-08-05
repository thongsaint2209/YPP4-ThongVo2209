USE MsList

-- Dashboard Screen
-- Get information of a user (Slide 9)
SELECT 
    acc.Id, 
    acc.Avatar, 
    acc.Email, 
    acc.FirstName, 
    acc.LastName, 
    acc.Company, 
    acc.AccountStatus
FROM Account acc
WHERE acc.Email = 'user1@example.com'

-- Get lists created by a user (Slide 9)
SELECT 
    l.Id, 
    l.Color, 
    l.Icon, 
    l.ListName, 
    l.ListStatus, 
    l.UpdatedAt
FROM List l
INNER JOIN Account AS acc ON l.CreatedBy = acc.Id
WHERE acc.Id = 1
ORDER BY l.UpdatedAt ASC

-- Get favorite lists of a user (Slide 9)
SELECT 
    l.Id, 
    l.Color, 
    l.Icon, 
    l.ListName, 
    l.ListStatus
FROM List l
INNER JOIN FavoriteList fl ON l.Id = fl.ListId
WHERE fl.AccountId = 1
ORDER BY l.UpdatedAt ASC;

-- Create List
-- Get all list types (Slide 13)
SELECT 
    lt.Id, 
    lt.Title, 
    lt.Icon
FROM ListType lt

-- Get all templates of a specific provider (Slide 15)
SELECT 
    lt.Id,
    lt.Title, 
    lt.TemplateDescription, 
    lt.HeaderImage
FROM ListTemplate lt
JOIN TemplateProvider tp ON tp.Id = lt.ProviderId
WHERE tp.ProviderName = 'Microsoft'

-- Get all workspaces of a user
SELECT 
    w.Id, 
    w.WorkspaceName
FROM WorkspaceMember wm
INNER JOIN Workspace w ON wm.WorkspaceId = w.Id
WHERE wm.AccountId = 4
ORDER BY wm.Id DESC;

-- Create List From Template
    
-- Get basic information of a specific template(Slide 18)
SELECT 
    lt.Id, 
    lt.Title, 
    lt.Icon, 
    lt.Sumary, 
    lt.Feature
FROM ListTemplate lt
WHERE lt.Id = 1

-- Get matrix of list with value cell
SELECT 
    lr.Id list_row_id,
    ldc.Id list_column_id,
    lcl.CellValue cell_value
FROM ListRow lr
CROSS JOIN ListDynamicColumn ldc
LEFT JOIN ListCellValue lcl ON lcl.ListRowId = lr.Id AND lcl.ListColumnId = ldc.Id
WHERE lr.ListId = ldc.ListId AND lr.ListId = 1
ORDER BY lr.Id, ldc.Id

