import { APIGatewayProxyResult } from 'aws-lambda'

export const _response = (statusCode?: number, body?: Object) => {
  return {
    statusCode: statusCode || 502,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  } as APIGatewayProxyResult
}

export default {
  _200(body?: Object): APIGatewayProxyResult {
    return _response(200, body)
  },

  _401(): APIGatewayProxyResult {
    return _response(401, {
      message: 'Unauthorized',
    })
  },

  _404(): APIGatewayProxyResult {
    return _response(404)
  },

  _500(body?: Object): APIGatewayProxyResult {
    return _response(500, body)
  },
}
