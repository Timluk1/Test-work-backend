import jwt from "jsonwebtoken";
import { TokenDto } from "../../dto/token.dto";
import { SECRET_KEY } from "./data";

class TokenService {
    async generateToken(tokenDto: TokenDto): Promise<string> {
        return jwt.sign(tokenDto, SECRET_KEY, { expiresIn: "7d" });
    }

    async validateToken(token: string): Promise<TokenDto | null> {
        try {
            return jwt.verify(token, SECRET_KEY) as TokenDto;
        } catch {
            return null;
        }
    }
}

export const tokenService = new TokenService();
