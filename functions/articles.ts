import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import response from './io/response'
import dynamo from './io/dynamo'

export const list: APIGatewayProxyHandler = async (_event, _context) => {
  try {
    const result = await dynamo.scan({
      TableName: process.env.ARTICLES_TABLE_NAME,
    })
    return response._200(result)
  } catch (error) {
    return response._500(error)
  }
}

export const put: APIGatewayProxyHandler = async (event, _context) => {
  try {
    await dynamo.put({
      TableName: process.env.ARTICLES_TABLE_NAME,
      Item: JSON.parse(event.body),
    })
    return response._200(JSON.parse(event.body))
  } catch (error) {
    return response._500(error)
  }
}

export const get: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters

  try {
    const { Item } = await dynamo.get({
      TableName: process.env.ARTICLES_TABLE_NAME,
      Key: {
        ID: id,
      },
    })
    return Item ? response._200(Item) : response._404()
  } catch (error) {
    return response._500(error)
  }
}
