
/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 */

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    tags:
 *      - Users
 *    description: Find user by id
 *    security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *       - name: id
 *         in: path
 *         description:
 *         required: True
 *    responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: object
 *           $ref: "#/definitions/User"
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
 * /users/profile:
 *   get:
 *     tags:
 *       - Users
 *     description: Get user logged
 *     security:
 *      - JWT200: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: object
 *           $ref: "#/definitions/User"
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
 * /users/:
 *   get:
 *     tags:
 *       - Users
 *     description: Get all users
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: array
 *           items:
 *             schema:
 *               $ref: "#/definitions/User"
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
 * /users/:
 *   post:
 *     tags:
 *       - Users
 *     description: Create a user
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
 *           $ref: "#/definitions/User"
 *     responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /users/:
 *   put:
 *     tags:
 *       - Users
 *     description: Update logged user
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
 *           $ref: "#/definitions/User"
 *     responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    tags:
 *      - Users
 *    description: Update user by id
 *    security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *       - name: id
 *         in: path
 *         description:
 *         required: True
 *       - name: body
 *         in: body
 *         description:
 *         required: True
 *         schema:
 *           type: object
 *           $ref: "#/definitions/User"
 *    responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: object
 *           $ref: "#/definitions/User"
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
 * /users/:
 *   delete:
 *     tags:
 *       - Users
 *     description: Delete logged user
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       500:
 *         description: Internal server error
 *
 */

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags:
 *      - Users
 *    description: Delete user by id
 *    security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *    produces:
 *      - application/json
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description:
 *        required: True
 *    responses:
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
