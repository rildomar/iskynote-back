/**
 * @swagger
 * definitions:
 *   Cbpq:
 *     type: object
 *     properties:
 *       status:
 *         type: string
 *       cbpq:
 *         type: string
 *       categoria:
 *         type: string
 *       atleta:
 *         type: string
 *       federacao:
 *         type: string
 *       habilitacao:
 *         type: string
 *       filiacao:
 *         type: string
 *       validade:
 *         type: string
 *       emissao:
 *         type: string
 *       img:
 *         type: string
 *       historico:
 *         type: array
 *         items:
 *             type: object
 *             properties:
 *                value:
 *                  type: string
 *       evolucao:
 *         type: array
 *         items:
 *             type: object
 *             properties:
 *                value:
 *                  type: string
 */

 /**
 * @swagger
 * /cbpq:
 *   get:
 *     tags:
 *       - CBPQ
 *     summary: Pesquise todas as informações de um paraquedista através do seu numero de CBPQ ou CPF.
 *     description: Pesquise todas as informações de um paraquedista através do seu numero de CBPQ ou CPF.
 *     security:
 *      - JWT: [admin]   # Use OAuth with a different scope
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: cbpq
 *         in: query
 *         required: false
 *       - name: cpf
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Operation executed with success
 *         schema:
 *           type: array
 *           items:
 *              schema:
 *              $ref: "#/definitions/Cbpq"
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
