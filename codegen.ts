import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_SCHEMA_URL || 'https://api.danz.now/graphql',
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'fragment-matcher',
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ['bunx biome format --write src/generated/graphql.tsx'],
  },
}

export default config
