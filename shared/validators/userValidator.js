
import { z } from 'zod';
import xss from 'xss';

const sanitize = (val) => (typeof val === 'string' ? xss(val) : val);

const userSchema = z.object({
    email: z.string().email().transform(sanitize),
    googleId: z.string().transform(sanitize),
    isVerified: z.boolean(),
    isProfileCompleted: z.boolean(),
    referredById: z.string().nullable().optional().transform(sanitize),
    profile: z.object({
        name: z.string().min(2).max(30).regex(/^[a-z0-9_.]+$/, "Username inválido").transform(sanitize),
        nickname: z.string().max(50).optional().transform(sanitize),
        isPrivate: z.boolean().optional(),
        photoUrl: z.string().url().optional().or(z.literal(''))
    })
});

export const userValidator = {
    validate: (data) => {
        const result = userSchema.safeParse(data);
        return {
            isValid: result.success,
            error: result.success ? null : result.error.flatten()
        };
    }
};
