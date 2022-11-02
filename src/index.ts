import express from 'express'
import dotenv from 'dotenv'
import { JwtMiddleware } from './middlewares/jwt.middleware'
import { ErrorMiddleware } from './middlewares/error.middleware'
import { ensureDatabaseConnection } from './utils/db.util'
import { getEnv } from './utils/env.util'
import { RootRouter } from './routers/root.router'
import { mainModule } from 'process'

// Configuring application
if (process.env.NODE_ENV === 'development') {
    // Development configuration
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
expressApp.use('/', RootRouter)

// Error handler middleware
expressApp.use(ErrorMiddleware)

// Ensure database connection and start server
const main = async () => {
    try {
        await ensureDatabaseConnection()
        expressApp.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()
