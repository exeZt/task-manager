-- Создание таблицы

CREATE TABLE "tasks" (
	"id"	TEXT NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"completed"	NUMERIC,
	"date"	INTEGER,
	"priority"	TEXT,
	PRIMARY KEY("id") ON CONFLICT ABORT
);