import { APIGatewayProxyResult } from 'aws-lambda'

const _response = (statusCode: number, body?: Object) => {
  return {
    statusCode: statusCode || 502,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  } as APIGatewayProxyResult
}

export default {
  _200(body?: Object): APIGatewayProxyResult {
    return _response(200, body)
  },

  _404(): APIGatewayProxyResult {
    return _response(404)
  },

  _500(body?: Object): APIGatewayProxyResult {
    return _response(500, body)
  },
}
