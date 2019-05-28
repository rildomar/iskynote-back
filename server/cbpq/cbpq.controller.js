const YQL = require('yql');
const Xray = require('x-ray');
const db = require('../../config/mysql');
const down = require('../../config/imageDownloader');

const xray = new Xray();

const updateCbpqData = async (req, res, next) => {
  try {

    if (req.atleta.rastreamento || req.atleta.emissao) {
      const sql = `
        INSERT INTO iskynote_db.cbpq
          (
            categoria,
            habilitacao,
            filiacao,
            validade,
            dt_emissao_credencial,
            createAt,
            updateAt,
            status,
            numCbpq,
            rastreamento
            )
          VALUES
          (?,?,?,?,?,?,?,?,?,?);
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
          req.atleta.status,
          req.atleta.cbpq,
          req.atleta.rastreamento
        ]
      const [rows, fields] = await db.execute(sql, data);

      req.atleta.cbpq_id = rows.insertId
      return next();
    } else {
      const sql = `
        INSERT INTO iskynote_db.cbpq
          (categoria, habilitacao, filiacao, validade, createAt, updateAt, status, numCbpq)
          VALUES
          (?,?,?,?,?,?,?,?);
      `;
      const data =
        [
          req.atleta.categoria,
          req.atleta.habilitacao,
          new Date(fixDateCBPQ(req.atleta.filiacao)),
          new Date(fixDateCBPQ(req.atleta.validade)),
          new Date(),
          new Date(),
          req.atleta.status,
          req.atleta.cbpq
        ]
      const [rows, fields] = await db.execute(sql, data);

      req.atleta.cbpq_id = rows.insertId
      return next();
    }

  } catch (error) {
    console.log('CBPQ - ERROR', error);
    next(error);
  }
};

const createPersonData = async (req, res, next) => {
  try {

    const sql = `
    INSERT INTO pessoa
    (
      name,
      createdAt,
      updatedAt,
      numCpf,
      cbpq_cbpq_id,
      img
    )
    VALUES
    (?,?,?,?,?,?);
    `; // parei em criar a pessoa depois de criar a cbpq.
    const data =
      [
        req.atleta.atleta,
        new Date(),
        new Date(),
        parseInt(req.query.cpf),
        req.atleta.cbpq_id,
        req.atleta.img
      ];
    const [rows, fields] = await db.execute(sql, data);
    res.json(rows);
  } catch (error) {
    let sqlTransaction = `DELETE FROM cbpq where cbpq_id = ${req.atleta.cbpq_id}`;
    const [rows, fields] = await db.execute(sqlTransaction);
    console.log(`CBPQ_ID: ${req.atleta.cbpq_id} deletado com sucesso.`, rows);
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

    let sql = `
      SELECT 
        p.person_id,
        p.name,
        p.email,
        p.celphone,
        p.site_cbpq,
        p.uspa,
        p.site_uspa,
        p.height,
        p.weight,
        p.type_of_blood,
        p.numCpf,
        p.address_id,
        p.img
        c.cbpq_id,
        c.categoria,
        c.habilitacao,
        c.filiacao,
        c.validade,
        c.dt_emissao_credencial,
        c.createAt,
        c.updateAt,
        c.status,
        c.numCbpq
      FROM
        pessoa as p, 
        cbpq as c
      WHERE 
        p.cbpq_cbpq_id = c.cbpq_id 
    `;

    // if (!req.query.cbpq) {
    //   sql += `
    //   and p.numCpf = ${req.query.cpf};
    //   `;
    // } else {
    //   sql += `
    //   and c.numCbpq = ${req.query.cbpq};
    //   `;
    // }
    // const [rows, fields] = await db.execute(sql);

    // if (rows.length > 0) {
    //   req.atleta = rows[0];
    //   res.json(req.atleta);
    // } else {
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

        req.atleta = splitEmissao(atleta);
        // return next();
        res.json(req.atleta);
      }) // results para o historic e evolucao
    }) // 1€ x-ray
    // }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

function fazerTrim(string) {
  return string.replace(/^\s+|\s+$/g, "");
}

const splitEmissao = (atleta) => {
  if (atleta.emissao) {
    let arrAtleta = atleta.emissao.split(' ');

    atleta.emissao = arrAtleta[0];
    console.log(arrAtleta);
    if (arrAtleta.length > 0) {
      atleta.rastreamento = arrAtleta[2];
    }
    return atleta;
  } else {
    return atleta;
  }
};

module.exports = {
  cbpqData: cbpqData,
  updateCbpqData: updateCbpqData,
  createPersonData: createPersonData
};
