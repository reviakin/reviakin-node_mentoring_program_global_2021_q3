const DEFAULT_JWT_SECRET = "DEFAULT_JWT_SECRET";

const JWT_SECRET = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : DEFAULT_JWT_SECRET;

export { JWT_SECRET };
