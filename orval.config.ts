import { defineConfig } from 'orval'

export default defineConfig({
  nexusguard: {
    input: './openapi/nexusguard.openapi.yaml',
    output: {
      mode: 'split',
      target: './src/api/generated/endpoints.ts',
      schemas: './src/api/generated/models',
      client: 'react-query',
      mock: true,
      clean: true,
      prettier: false,
      override: {
        mutator: {
          path: './src/api/mutator.ts',
          name: 'customInstance',
        },
        operations: {
          createConsultationRequest: {
            query: {
              useQuery: false,
              useMutation: true,
            },
          },
        },
        query: {
          useQuery: true,
          useMutation: false,
          signal: true,
        },
      },
    },
  },
})