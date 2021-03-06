/**
 * @swagger
 * definitions:
 *   Login:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Auth service.
 *     description: Auth service
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description:
 *         required: True
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Login"
 *     responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 */
