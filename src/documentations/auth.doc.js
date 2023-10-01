// *************************API DOCUMENTATION******************************

// *************************USER REGISTER******************************
/**
 * @openapi
 * /auth/signup:
 *  post:
 *      tags:
 *      - Auth
 *      summary: User signup
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: Timothy
 *                          password:
 *                              type: string
 *      responses:
 *          400:
 *              description: Username Address already exist
 *          200:
 *              description: Registered successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Internal server eeror
 */