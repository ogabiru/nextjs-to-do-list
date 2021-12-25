import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3'

const dir = './db/'
const file = 'todos.db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = new sqlite3.Database(dir+file)

  if (req.method === 'GET') {
    await db.all("SELECT * FROM todos WHERE id = ?", req.query.todoId, (err: Error, rows: any[]) => {
      if (err) {
        res.status(404).json({error: 'No to do found'})
      }
      if (rows[0] === undefined) {
        res.status(404).json({error: 'No to do found'})
      }
      res.status(200).json(rows)
    })
  }

  if (req.method === 'PUT') {
    await db.all("UPDATE todos set title=?, description=?, started_at=?, paused_at=?, finished_at=?, time_spent=? WHERE id=?",
    [
      req.body.title,
      req.body.description,
      req.body.started_at,
      req.body.paused_at,
      req.body.finished_at,
      req.body.time_spent,
      req.query.todoId
    ],
    (err: Error, rows: any[]) => {
      if (err) {
        res.status(200).json({error: 'To do not updated'})
      }
      res.status(200).json({success: 'To do updated'})
    })
  }

  if (req.method === 'DELETE') {
    await db.all("DELETE FROM todos WHERE id = ?", req.query.todoId, (err: Error, rows: any[]) => {
      if (err) {
        res.status(200).json({error: 'To do not found'})
      }
      res.status(200).json({success: 'To do deleted'})
    })
  }

  db.close();
}
