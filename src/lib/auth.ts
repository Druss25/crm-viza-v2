import { db } from './database'
import { BetterAuthOptions, betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'

import * as schema from '../db/schema'

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'mysql',
        schema: schema
    }),
    advanced: {
        cookies: {
            session_token: {
                name: 'crm_session'
            }
        }
    },
    emailAndPassword: {
        enabled: true
        // requireEmailVerification: true
    },
    // emailVerification: {
    //     sendOnSignUp: true,
    //     autoSignInAfterVerification: true,
    //     sendVerificationEmail: async ({ user, token }) => {
    //         const verificationUrl = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`

    //         await sendEmail({
    //             to: user.email,
    //             subject: 'Verify your email address',
    //             text: `Click the link to verify you email: ${verificationUrl}`
    //         })
    //     }
    // },
    plugins: [nextCookies()]
} satisfies BetterAuthOptions)

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
