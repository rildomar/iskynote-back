/**
 * @swagger
 * definitions:
 *   DefaultResponse:
 *     type: object
 *     properties:
 *       value1:
 *         type: number
 *       date:
 *         type: string
 */

/**
 * @swagger
 * /charts/powerfactor:
 *   get:
 *     tags:
 *       - Charts
 *     summary: Get powerfactor data.
 *     description: Get powerfactor data
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: b1
 *         in: query
 *         required: true
 *       - name: b2
 *         in: query
 *         required: true
 *       - name: b3
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: array
 *           items:
 *              schema:
 *              $ref: "#/definitions/DefaultResponse"
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
 * /charts/area:
 *   get:
 *     tags:
 *       - Charts
 *     summary: Get area chart data.
 *     description: Get area chart data
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: b1
 *         in: query
 *         required: true
 *       - name: b2
 *         in: query
 *         required: true
 *       - name: element
 *         in: query
 *         required: true
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
