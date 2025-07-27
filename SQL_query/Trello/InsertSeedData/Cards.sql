-- Script insert 1000 dòng vào bảng Cards
-- CoverType: COLOR (lưu ColorId), ATTACHMENT (lưu AttachmentId), UNSPLASH (lưu URL)

DECLARE @i INT = 1;
DECLARE @StageId INT;
DECLARE @CoverType VARCHAR(50);
DECLARE @CoverValue VARCHAR(MAX);
DECLARE @RandomNum INT;

WHILE @i <= 1000
BEGIN
    -- Random StageId từ 1-50 (giả sử có 50 stages)
    SET @StageId = ABS(CHECKSUM(NEWID()) % 50) + 1;
    
    -- Random CoverType
    SET @RandomNum = ABS(CHECKSUM(NEWID()) % 3);
    
    IF @RandomNum = 0
    BEGIN
        SET @CoverType = 'COLOR';
        -- Random ColorId từ 1-20
        SET @CoverValue = CAST((ABS(CHECKSUM(NEWID()) % 20) + 1) AS VARCHAR(MAX));
    END
    ELSE IF @RandomNum = 1
    BEGIN
        SET @CoverType = 'ATTACHMENT';
        -- Random AttachmentId từ 1-100
        SET @CoverValue = CAST((ABS(CHECKSUM(NEWID()) % 100) + 1) AS VARCHAR(MAX));
    END
    ELSE
    BEGIN
        SET @CoverType = 'UNSPLASH';
        -- Random Unsplash URL
        SET @CoverValue = 'https://images.unsplash.com/photo-' + 
                         CAST(ABS(CHECKSUM(NEWID()) % 9999999) + 1000000 AS VARCHAR(20)) + 
                         '?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';
    END

    INSERT INTO Cards (
        StageId,
        Title,
        Description,
        CreatedAt,
        Status,
        Location,
        StartDate,
        DueDate,
        CoverType,
        CoverValue,
        Position
    ) VALUES (
        @StageId,
        'Card Title ' + CAST(@i AS VARCHAR(10)),
        'Description for card number ' + CAST(@i AS VARCHAR(10)) + '. This is a sample description with some details about the task or item.',
        DATEADD(DAY, -ABS(CHECKSUM(NEWID()) % 365), GETDATE()), -- Random date trong năm qua
        CASE ABS(CHECKSUM(NEWID()) % 3)
            WHEN 0 THEN 'Active'
            WHEN 1 THEN 'Archived'
            ELSE 'Draft'
        END,
        CASE ABS(CHECKSUM(NEWID()) % 5)
            WHEN 0 THEN 'Office A'
            WHEN 1 THEN 'Office B'
            WHEN 2 THEN 'Remote'
            WHEN 3 THEN 'Meeting Room 1'
            ELSE 'Conference Hall'
        END,
        DATEADD(DAY, ABS(CHECKSUM(NEWID()) % 30), GETDATE()), -- Start date trong 30 ngày tới
        DATEADD(DAY, ABS(CHECKSUM(NEWID()) % 60) + 30, GETDATE()), -- Due date 30-90 ngày tới
        @CoverType,
        @CoverValue,
        @i -- Position theo thứ tự
    );
    
    SET @i = @i + 1;
END;

-- Kiểm tra kết quả
SELECT 
    CoverType,
    COUNT(*) as Count,
    MIN(CoverValue) as SampleValue1,
    MAX(CoverValue) as SampleValue2
FROM Cards 
GROUP BY CoverType;

-- Xem một số mẫu
SELECT TOP 10 
    Id,
    Title,
    CoverType,
    CoverValue,
    CreatedAt
FROM Cards 
ORDER BY Id DESC;