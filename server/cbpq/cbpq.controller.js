const YQL = require('yql');
const Xray = require('x-ray');

const xray = new Xray();

module.exports.cbpqData = async (req, res, next) => {
  try {

    const atleta = {historico: [], evolucao: []}
    const licenca = req.query.cbpq;
    

    xray('https://www.cbpq.org.br/site/filiados/consulta-licenca?cbpq=' + licenca + '&cpf=', 'div.form-group', [{
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

      xray('https://www.cbpq.org.br/site/filiados/consulta-licenca?cbpq=' + licenca + '&cpf=', '.col-md-12', [{
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
                atleta.historico.push({value : fazerTrim(historico.value)});
              });
              break;

            case 'Evolução':
              resultsObj.historic.map((historico) => {
                atleta.evolucao.push({value: fazerTrim(historico.value)});
              });
            default:
              break;
          };

        });

        res.json(atleta);
        
      }) // results para o historic e evolucao
      
    }) // 1€ x-ray
  } catch (error) {
    next(error);
  }
};

function fazerTrim(string) {
  return string.replace(/^\s+|\s+$/g, "");
}
