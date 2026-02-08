
import { z } from 'zod';
import xss from 'xss';

const sanitize = (val) => (typeof val === 'string' ? xss(val) : val);

export const postValidator = {
    validate: (post) => {
        const schema = z.object({
            authorId: z.string().transform(sanitize),
            text: z.string().max(5000).transform(sanitize),
            fileUrl: z.string().url(),
            groupId: z.string().optional().transform(sanitize),
        });

        try {
            schema.parse(post);
            return { isValid: true };
        } catch (err) {
            return { isValid: false, error: err.errors.map(e => e.message).join(', ') };
        }
    }
};
