declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_URL: string;
    API_BASE_URL: string;
    NEXTAUTH_SECRET: string;
    GRAPHQL_API_URL: string;
  }
}
