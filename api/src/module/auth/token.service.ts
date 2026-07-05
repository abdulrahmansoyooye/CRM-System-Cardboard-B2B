import { AppError } from '../../core/errors/AppError';
import { AuthTokenPayload, generateRefreshToken, generateToken, verifyRefreshToken } from '../../utils/jwt';
import { TokenBlacklist } from './token-blacklist.model';
import { User } from './user.model';

export async function issueTokens(payload: { id: string; email: string; role: string }) {
  const tokenPayload: AuthTokenPayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
  };

  const accessToken = generateToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  return { accessToken, refreshToken };
}

export async function refreshAccessToken(refreshToken: string) {
  // Check blacklist
  const blacklisted = await TokenBlacklist.findOne({ token: refreshToken });
  if (blacklisted) {
    throw new AppError('Refresh token has been revoked', 401);
  }

  let decoded: AuthTokenPayload;
  try {
    decoded = verifyRefreshToken(refreshToken) as AuthTokenPayload;
  } catch {
    throw new AppError('Invalid or expired refresh token', 401);
  }

  if (decoded.type !== 'refresh') {
    throw new AppError('Invalid token type', 401);
  }

  // Verify user still exists and is active
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  if (!user.isActive) {
    throw new AppError('User account is inactive', 403);
  }

  const tokenPayload: AuthTokenPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const newAccessToken = generateToken(tokenPayload);
  const newRefreshToken = generateRefreshToken(tokenPayload);

  // Blacklist the old refresh token
  await blacklistToken(refreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function blacklistToken(token: string): Promise<void> {
  try {
    const decoded = verifyRefreshToken(token) as AuthTokenPayload;
    const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await TokenBlacklist.create({ token, expiresAt });
  } catch {
    // If token is already expired or invalid, no need to blacklist
  }
}
