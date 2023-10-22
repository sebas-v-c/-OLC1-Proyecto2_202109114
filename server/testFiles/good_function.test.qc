-- Function declaration
CREATE FUNCTION CalcularAreaCirculo(@pi DOUBLE, @radio DOUBLE)
RETURNS DOUBLE
BEGIN
    DECLARE @area DOUBLE;
    SET @area = @pi * @radio * @radio;
    RETURN @area;
END;

DECLARE @pi DOUBLE DEFAULT 3.14159;
DECLARE @radio DOUBLE DEFAULT 5.0;

DECLARE @result DOUBLE DEFAULT CalcularAreaCirculo(@pi, @radio);

-- Method declaration

CREATE PROCEDURE SumarNumeros
       @numero1 INT,
       @numero2 INT
AS
BEGIN
    DECLARE @RESULTADO INT;
    SET @resultado = @numero1 + @numero2;
    -- TODO make the cast function
    PRINT "La suma es: " + @resultado;
END;

SumarNumeros(5, 10);
