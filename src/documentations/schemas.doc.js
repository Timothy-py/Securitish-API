// *************SECURITY SCHEMA***********************************
/**
 * @openapi
 * components:
 *      securitySchemes:
 *          basicAuth:
 *              type: http
 *              scheme: basic
 */

// *************USER SCHEMA***********************************
/**
 * @openapi
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *     - username
 *     - password
 *    properties:
 *          _id:
 *              type: string
 *              example: 64ddbca37ff26a9ea19a7737
 *          username:
 *              type: string
 *              example: Timothy
 *          password:
 *              type: string
 *              example: "$2a$10$h0OT/iSymt7A7I.ac5ZpWu2o4hVgUQhgc7ii1kvJZ7xIDh3Sn9r3K"
 *          createdAt:
 *              type: string
 *              example: 2023-08-17T06:22:27.136+00:00
 *  */

// *************SAFEBOX SCHEMA***********************************
/**
 * @openapi
 * components:
 *  schemas:
 *   Safebox:
 *    type: object
 *    required:
 *     - name
 *     - password
 *    properties:
 *          _id:
 *              type: string
 *              example: 64ddbca37ff26a9ea19a7737
 *          name:
 *              type: string
 *              example: Gold
 *          password:
 *              type: string
 *              example: "$2a$10$h0OT/iSymt7A7I.ac5ZpWu2o4hVgUQhgc7ii1kvJZ7xIDh3Sn9r3K"
 *          createdAt:
 *              type: string
 *              example: 2023-08-17T06:22:27.136+00:00
 *  */

// *************CONTENT SCHEMA***********************************
/**
 * @openapi
 * components:
 *  schemas:
 *   Content:
 *    type: object
 *    required:
 *     - name
 *     - _userId
 *     - _safeboxId
 *    properties:
 *          _id:
 *              type: string
 *              example: 64ddbca37ff26a9ea19a7737
 *          name:
 *              type: string
 *              example: Gold
 *          description:
 *              type: string
 *          createdAt:
 *              type: string
 *              example: 2023-08-17T06:22:27.136+00:00
 *          _userId:
 *              type: string
 *          _safeboxId:
 *              type: string
 *  */
