DECLARE @nota INT;
SET @nota = 10;

-- Simple CASE
CASE @nota
     WHEN 100 THEN "Sobresaliente"
     WHEN 99 THEN "Muy Bueno"
     WHEN 98 THEN "Bueno"
     ELSE "Aprobado"
END;


CASE @nota
     WHEN 100 THEN "Sobresaliente"
     WHEN 99 THEN "Muy Bueno"
     WHEN 98 THEN "Bueno"
     ELSE "Aprobado"
END AS @aprobado;

declare @nota2 int;
SET @nota2 = 99;

CASE @nota2
     WHEN 100 THEN "Sobresaliente"
     WHEN 99 THEN "Muy Bueno"
     WHEN 98 THEN "Bueno"
     ELSE "Aprobado"
END AS @mensaje;

-- Searched CASE

DECLARE @NOTAS3 INT;
SET @NOTAS3 = 70;

CASE
    WHEN @NOTAS3 > 85 THEN "EXCELENTE"
    WHEN @NOTAS3 >= 61 AND @NOTAS3 <= 85 THEN "APROBADO"
    ELSE "NO APROBADO"
END;


CASE
WHEN @NOTAS3 > 85 THEN "EXCELENTE"
WHEN NOT (@NOTAS3 >= 61 AND @NOTAS3 <= 85) THEN "NO APROBADO"
ELSE "APROBADO"
END AS @mensaje2;
