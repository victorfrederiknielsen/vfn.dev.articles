import {
  PutItemInput,
  ScanInput,
  GetItemInput,
  DocumentClient,
} from 'aws-sdk/clients/dynamodb'

const options = process.env.IS_OFFLINE
  ? {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    }
  : {}

const db = new DocumentClient(options)

export default {
  scan: async (params: ScanInput) => {
    return await db.scan(params).promise()
  },

  get: async (params: GetItemInput) => {
    return await db.get(params).promise()
  },

  put: async (params: PutItemInput) => {
    return await db.put(params).promise()
  },
}
