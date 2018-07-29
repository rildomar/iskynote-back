/**
 * @swagger
 * definitions:
 *   PowerFactor:
 *     type: object
 *     properties:
 *       value1:
 *         type: number
 *       date:
 *         type: string
 */

 /**
 * @swagger
 * /measurements/powerfactor:
 *   get:
 *     tags:
 *       - Measurements
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
 *              $ref: "#/definitions/PowerFactor"
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
