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
 *       login:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 */


/**
 * @swagger
 * definitions:
 *   ChangePassword:
 *     type: object
 *     properties:
 *       password:
 *         type: string
 *       newPassword:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   ChangePassword404:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Unauthorized:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       stack:
 *         type: string
 */

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    tags:
 *      - Users
 *    summary: Find any users by id.
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
 *     summary: Get profile user logged.
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
 * /users/password:
 *   put:
 *     tags:
 *       - Users
 *     summary: Change password to user logged.
 *     description: Change password to user logged.
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
 *           $ref: "#/definitions/ChangePassword"
 *     responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: object
 *           $ref: "#/definitions/ChangePassword"
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           $ref: "#/definitions/ChangePassword404"
 *       401:
 *         description: Unauthorized error
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Unauthorized"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all system users.
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
 *     summary: Create a user.
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
 *     summary: Update user logged.
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
 *    summary: Update any user by id.
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
 *     summary: Delete logged user.
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
 *    summary: Delete any user by id.
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

/**
 * @swagger
 * /users/b1:
 *   get:
 *     tags:
 *       - Users
 *     description: Get all B1's of current user.
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
