import express from 'express'
import dotenv from 'dotenv'
import { JwtMiddleware } from './middlewares/jwt.middleware'
import { ErrorMiddleware } from './middlewares/error.middleware'
import { ensureDatabaseConnection } from './utils/db.util'
import { getEnv } from './utils/env.util'
import { RootRouter } from './routers/root.router'

// Configuring environment variables
if (process.env.NODE_ENV === 'development') {
    dotenv.config()
}

// Setting PORT constant
const PORT = parseInt(getEnv('PORT') as string) || 8080

const expressApp = express()

// Applying all middlewares
expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: true }))
// Authentication & Authorization middleware
expressApp.use(JwtMiddleware)

// Connecting to root router
expressApp.use('/api', RootRouter)

// Error handler middleware
expressApp.use(ErrorMiddleware)

// Ensure database connection and start server
// Ensure database connection and start server
ensureDatabaseConnection()
    .then(() => {
        console.log('🚀 Database connection ensured')
    })
    .then(() => {
        expressApp.listen(PORT, () => {
            console.log(`🚀 Server listening at http://localhost:${PORT}/`)
        })
    })
    .catch((err) => console.error(err))
