/**
 * @swagger
 * definitions:
 *   Weather:
 *     type: object
 *     properties:
 *       latitude:
 *         type: number
 *       longitude:
 *         type: number
 */

 /**
 * @swagger
 * /weather:
 *   get:
 *     tags:
 *       - Weather
 *     description: Get weather data
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: latitude
 *         in: query
 *         required: true
 *       - name: longitude
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: array
 *           items:
 *              schema:
 *              $ref: "#/definitions/Weather"
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
