interface IJwtConfig {
  secret: string
  signOptions: object
}

export const getJwtConfig = (overrides?: object): IJwtConfig => ({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '60s' },
  ...overrides
})

export const jwtConfig = getJwtConfig()
