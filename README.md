# Task Manager application usage guide
## API Spec

### Prepare

```bash
git clone https://github.com/exeZt/task-manager.git
```

**Configure pyenv**

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bashrc
pyenv virtualenv 3.13 task-manager
pyenv activate task-manager
```
**Configure frontend (for localhost)**

```bash
cd frontend && npm i && echo "VITE_BASE_URL=http://localhost:8000/api" | tee
npm run dev # for already use
```

**Get sqlite3 installed**

```bash
# only for debian on this guide version
sudo apt-get install sqlite3
```

**Application startup**
```bash
cd backend && python manage.py runserver && cd ../frontend && npm run dev
```
For better usage you can deploy this app on server using Apache2 or Nginx

### Backend API 

Get all tasks list
> /task - GET, No params -> Array<ITask>

Create new task
> /task/create - POST, ITask as JSON

Delete task
> /task/delete - POST, ITask as JSON

### Types declaration

Task type, date as Date or string
```typescript
interface ITask {
    id: string
    name: string
    date: Date
    priority: TPriority
    completed: bool
}
```

Task priority type
```typescript
type TPriority = "low" | "medium" | "high"
```

Data handler

Connect method
```python
def connect(self: Self@DataHandler) -> Generator[Connection, Any, None]
```

Execute method
```python
def execute(self: Self@DataHandler, query: str, params: tuple = []) -> str
```
