-- DECLARING VARIABLES
declare @var1 int default 5;
declare @var2 varchar default "SiMoN";
declare @var3 boolean default true;
declare @var4 boolean default False;
declare @var5 double default 3.1415912;
declare @var6 date default 2023-10-16;
declare @var7 null default null;
declare @var8 varchar default "12341.1234123";
declare @var9 varchar default "2023-10-16";

-- DECLARING RESULT VARIABLES
declare @res1 varchar;
declare @res2 varchar;
declare @res3 varchar;
declare @res4 varchar;
declare @res5 varchar;
declare @res6 varchar;
declare @res7 varchar;

set @res1 = TYPEOF(@var1);
set @res2 = TYPEOF(@var2);
set @res3 = TYPEOF(@var3);
set @res4 = TYPEOF(@var4);
set @res5 = typeof(@var5);
set @res6 = TYPEOF(@var6);
set @res7 = TYPEOF(@var7);


-- DECLARING RESULTS FOR OTHER FUNCS
declare @resLower varchar;
declare @resUpper varchar;
declare @resRound double;
declare @resLen int;
declare @resTrunc double;

set @resLower = lower(@var2);
set @resUpper = UPPER(@var2);
set @resRound = rounD(@var5, 4);
set @resLen = LEN(@var2);
set @resTrunc = Truncate(@var5, 4);

-- TESTING CAST
/*Ya me dio hueva xd*/
declare @toInt int;
declare @toDouble double;
declare @toVarchar varchar;
declare @toBoolean BOOLEAN;
declare @toDate DATE;
declare @toNull NULL;

set @toInt = CAST(@var8 AS INT);
set @toDouble = CAST(@var8 AS DOUBLE);
set @toVarchar = CAST(@var5 AS varchar);
set @toBoolean = CAST(@var6 AS BOOLEAN);
set @toDate = CAST(@var9 AS DATE);
set @toNull = CAST(@var1 AS NULL);
