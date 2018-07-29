/**
 * @swagger
 * definitions:
 *   Weather:
 *     type: object
 *     properties:
 *       City:
 *         type: string
 *       Uf:
 *         type: string
 */

 /**
 * @swagger
 * /weather:
 *   get:
 *     tags:
 *       - Weather
 *     summary: To get weather data of a city.
 *     description: Get weather data
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: city
 *         in: query
 *         required: true
 *       - name: uf
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
