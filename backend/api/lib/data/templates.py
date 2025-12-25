# Определение структуры таблицы в виде строки для использования (создаем через неё таблицу если таковой нету)
def createTable():
    return """
        CREATE TABLE "tasks" (
            "id"	TEXT NOT NULL UNIQUE,
            "name"	TEXT NOT NULL,
            "completed"	NUMERIC,
            "date"	INTEGER,
            "priority"	TEXT,
            PRIMARY KEY("id") ON CONFLICT ABORT
        );
    """