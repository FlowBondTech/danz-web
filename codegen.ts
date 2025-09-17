import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
    : 'http://localhost:8080/graphql',
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
