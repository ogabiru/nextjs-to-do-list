import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3'
import fs from 'fs'

const dir = './db/'
const file = 'todos.db'

async function checkDatabase() {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, '0744')
  }
  if (!fs.existsSync(dir+file)) {
    fs.writeFileSync(dir+file, '')
  }

  let db = new sqlite3.Database(dir+file);
  db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, created_at BIGINT, started_at BIGINT, paused_at BIGINT, finished_at BIGINT, time_spent BIGINT)")
  db.close();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Check if database exists, if not, create it
  await checkDatabase();

  let db = new sqlite3.Database(dir+file)

  if (req.method === 'GET') {
    await db.all("SELECT * FROM todos", (err: Error, rows: any[]) => {
      if (err) {
        res.status(404).json({error: 'No to do found'})
      }
      res.status(200).json(rows)
    })
  }

  if (req.method === 'POST') {
    await db.all("INSERT INTO todos (title, description, created_at) values (?, ?, ?)",
    [req.body.title, req.body.description, new Date().getTime()],
    (err: Error, rows: any[]) => {
      if (err) {
        res.status(200).json({error: 'Not possible to add this to do'})
      }
      res.status(201).json({success: 'To do created successfully'})
    })
  }

  db.close();
}
