 /**
 * @swagger
 * /b1/{id}/b2:
 *   get:
 *     tags:
 *       - Points
 *     summary: Get all B2's by b1_id or b1_label.
 *     description: Get all B2's by b1 id or b1 label.
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
 * /b1/b2/{id}/b3:
 *   get:
 *     tags:
 *       - Points
 *     summary: Get all B3's by b2_id or b2_label.
 *     description: Get all B3's by b2 id or b2 label.
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
