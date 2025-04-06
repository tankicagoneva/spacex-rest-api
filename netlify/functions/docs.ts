import { Handler } from '@netlify/functions'
import fs from 'fs'
import path from 'path'

const html = process.env.LAMBDA_TASK_ROOT
    ? path.resolve(process.env.LAMBDA_TASK_ROOT, "./docs/index.html") : fs.readFileSync(path.join(process.cwd(), 'docs', 'index.html'), 'utf8')

export const handler: Handler = async (event, context) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: html,
    }
} 