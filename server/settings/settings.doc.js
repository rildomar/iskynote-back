/**
 * @swagger
 * definitions:
 *   UserB1:
 *     type: object
 *     properties:
 *       users_id:
 *         type: string
 *       b1_id:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Settings:
 *     type: object
 *     properties:
 *       query:
 *         type: string
 *       b1_id:
 *         type: string
 *       custom_title:
 *         type: string
 *       graph_id:
 *         type: string
 */

/**
 * @swagger
 * /settings/charts:
 *   get:
 *     tags:
 *       - Settings
 *     summary: Get all logged user chats settings.
 *     description: Get all logged user charts settings.
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 */

/**
 * @swagger
 * /settings/userb1:
 *   post:
 *     tags:
 *       - Settings
 *     summary: To associate a b1 to user.
 *     description: To associate a b1 to user
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
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
 *           $ref: "#/definitions/UserB1"
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

/**
 * @swagger
 * /settings/:
 *   post:
 *     tags:
 *       - Settings
 *     summary: to associate a graph setting and user.
 *     description: To associate a graph setting and user
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
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
 *           $ref: "#/definitions/Settings"
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

 /**
 * @swagger
 * /settings/{id}:
 *   put:
 *     tags:
 *       - Settings
 *     summary: To associate a graph setting and user.
 *     description: To associate a graph setting and user
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Config graph id
 *       - name: body
 *         in: body
 *         description:
 *         required: True
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Settings"
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
