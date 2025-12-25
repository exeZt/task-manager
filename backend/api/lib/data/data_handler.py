import sqlite3
from .templates import createTable
from contextlib import contextmanager
from typing import Any, List, Dict
import json

class DataHandler:
	@contextmanager
	def connect(self):
		conn = sqlite3.connect("./database.db")
		connection = conn
		try:
			yield conn
			conn.commit()
			try:
				conn.execute(createTable()) if conn.execute("""SELECT name FROM sqlite_master WHERE type='table' AND name="tasks";""").rowcount > 0 else print("db exists")
			except Exception: 
				conn.rollback()
				raise
		except Exception:
			conn.rollback()
			raise
		finally:
			conn.close()

	def execute(self, query: str, params: tuple = []) -> str:
		with self.connect() as conn:
			cursor = conn.cursor()
			try:
				if params:
					cursor.execute(query, params)
				else:
					cursor.execute(query)

				# Non-SELECT запросы
				if cursor.description is None:
						conn.commit()
						return json.dumps({"rows_affected": cursor.rowcount})

				# SELECT запросы
				columns = [col[0] for col in cursor.description]
				rows: List[Dict[str, Any]] = [
						dict(zip(columns, row)) for row in cursor.fetchall()
				]
				return json.dumps(rows)

			finally:
					cursor.close()
