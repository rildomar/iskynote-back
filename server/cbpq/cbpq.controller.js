const YQL = require('yql');
const Xray = require('x-ray');
const db = require('../../config/mysql');

const xray = new Xray();

const updateCbpqData = async (req, res, next) => {
  try {

    const sql = `
      INSERT INTO iskynote_db.cbpq
        (categoria, habilitacao, filiacao, validade, dt_emissao_credencial, createAt, updateAt, status)
        VALUES
        (?,?,?,?,?,?,?,?);
    `;
    const data =
      [
        req.atleta.categoria,
        req.atleta.habilitacao,
        new Date(fixDateCBPQ(req.atleta.filiacao)),
        new Date(fixDateCBPQ(req.atleta.validade)),
        new Date(fixDateCBPQ(req.atleta.emissao)),
        new Date(),
        new Date(),
        req.atleta.status
      ]

    const [rows, fields] = await db.execute(sql, data);
    res.json(rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fixDateCBPQ = (date) => {
  let splitDate = date.split('/');
  let dia = splitDate[0];
  let mes = splitDate[1];
  let ano = splitDate[2];
  return ano + '-' + mes + '-' + dia;
}

const cbpqData = async (req, res, next) => {
  try {

    const atleta = { historico: [], evolucao: [] }
    let link;

    if (!req.query.cbpq) {
      link = `https://www.cbpq.org.br/site/filiados/consulta-licenca?cbpq=&cpf=${req.query.cpf}`;
    } else {
      link = `https://www.cbpq.org.br/site/filiados/consulta-licenca?cbpq=${req.query.cbpq}&cpf=${req.query.cpf}`;
    }
    xray(link, 'div.form-group', [{
      label: 'label',
      valor: 'p',
      img: 'img@src'
    }])(function (err, results) {
      results.map((result) => {
        switch (result.label) {
          case 'Status':
            atleta.status = result.valor
            break;
          case 'CBPq':
            atleta.cbpq = result.valor
            break;
          case 'CIS':
            atleta.cis = result.valor
            break;
          case 'Categoria':
            atleta.categoria = result.valor
            break;
          case 'Atleta':
            atleta.atleta = result.valor
            break;
          case 'Clube':
            atleta.clube = result.valor
            break;
          case 'Federação':
            atleta.federacao = result.valor
            break;
          case 'Habilitação':
            atleta.habilitacao = result.valor
            break;
          case 'Filiação':
            atleta.filiacao = result.valor
            break;
          case 'Validade':
            atleta.validade = result.valor
            break;
          case 'Ex. Toxicológico':
            atleta.toxicologico = result.valor
            break;
          case 'Regularidade CEM':
            atleta.regularidadeCEM = result.valor
            break;
          case 'CEM':
            atleta.cem = result.valor
            break;
          case 'Emissão da Credencial':
            atleta.emissao = result.valor
            break;
          case 'CMA':
            atleta.cma = result.valor
            break;
          default:
          // code block
        } // switch
      })

      results.map((result, index) => {
        if (result.img !== undefined) {
          atleta.img = result.img
        }
      });

      xray(link, '.col-md-12', [{
        title: 'span',
        historic: xray('.col-md-12', '.row', [
          {
            value: 'span.line-value'
          }
        ])
      }])((err, results) => {

        // res.json(results);

        results.map((resultsObj, index) => {
          switch (resultsObj.title) {
            case 'Histórico de Mudança de Categoria':
              resultsObj.historic.map((historico) => {
                atleta.historico.push(fazerTrim(historico.value));
              });
              break;

            case 'Evolução':
              resultsObj.historic.map((historico) => {
                atleta.evolucao.push(fazerTrim(historico.value));
              });
            default:
              break;
          };

        });
        req.atleta = atleta;
        return next();
        // res.json(atleta);

      }) // results para o historic e evolucao

    }) // 1€ x-ray
  } catch (error) {
    next(error);
  }
};

function fazerTrim(string) {
  return string.replace(/^\s+|\s+$/g, "");
}

module.exports = {
  cbpqData: cbpqData,
  updateCbpqData: updateCbpqData
};