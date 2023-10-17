declare @sumatoria INT;

FOR @var IN 0..10
BEGIN
    SET @sumatoria = @sumatoria + @var;
END LOOP;

declare @sumatoria2 INT;
declare @chi INT default 10;


FOR @var IN 0..2
BEGIN
    SET @chi = @var;
END LOOP;

FOR @chi IN 11..21
BEGIN
    SET @sumatoria2 = @chi;
END LOOP;
