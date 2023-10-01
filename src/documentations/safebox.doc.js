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


// *************************ADD CONTENT TO SAFEBOX******************************
/**
 * @openapi
 * /safeboxes/{safeboxId}/contents:
 *  post:
 *      tags:
 *      - Safebox
 *      security:
 *          - basicAuth: []
 *      summary: Add content to safebox
 *      parameters:
 *          - in: path
 *            name: safeboxId
 *            schema:
 *              type: string
 *              required: true
 *          - in: query
 *            name: safeboxPassword
 *            schema:
 *              type: string
 *              required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Jujutsiu
 *                          description:
 *                              type: string
 *                              required: false
 *      responses:
 *          '201':
 *              description: Content added to safebox successfully
 *          400:
 *              description: Bad Request. Invalid request data.
 *          404:
 *              description: Safebox not found
 *          '401':
 *              description: Unauthorized 
 *          500:
 *              description: Internal server eeror
 */

// *************************GET THE CONTENTS OF A SAFEBOX******************************
/**
 * @openapi
 * /safeboxes/{safeboxId}/contents:
 *  get:
 *      tags:
 *      - Safebox
 *      security:
 *          - basicAuth: []
 *      summary: Get the contents of a safebox
 *      parameters:
 *          - in: path
 *            name: safeboxId
 *            schema:
 *              type: string
 *              required: true
 *          - in: query
 *            name: safeboxPassword
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          '200':
 *              description: Safebox contents retrieved successfully
 *          400:
 *              description: Bad Request. Invalid request data.
 *          404:
 *              description: Safebox not found
 *          '401':
 *              description: Unauthorized 
 *          500:
 *              description: Internal server eeror
 */