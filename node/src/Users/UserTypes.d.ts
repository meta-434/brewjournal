import { Request } from 'express';

interface UserAuthRequest extends Request {
    oidc?: {
        user: {
            email: string;
            name: string;
            sub: string;
            updated_at: string;
        }
    }
}

export { UserAuthRequest };