// *************************API DOCUMENTATION******************************

// *************************CREATE SAFEBOX******************************
/**
 * @openapi
 * /safeboxes/:
 *  post:
 *      tags:
 *      - Safebox
 *      security:
 *          - basicAuth: []
 *      summary: Create safebox
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Frankinscence
 *                          password:
 *                              type: string
 *      responses:
 *          '201':
 *              description: Safebox created successfully
 *          400:
 *              description: Bad Request. Invalid request data.
 *          '401':
 *              description: Unauthorized. Basic Authentication required. 
 *          500:
 *              description: Internal server eeror
 */