/* requerir módulo autos */
const autos = require('./personal_modules/autos');
const personas = require('./personal_modules/personas');

const concesionaria = {
  autos: autos,
  personas: personas,

  buscarAuto: (patenteABuscar) => {
    let autoBuscado = autos.filter((auto) => auto.patente === patenteABuscar);

    return autoBuscado.length >= 1 ? autoBuscado[0] : null;
  },

  venderAuto: (patente) => {
    let autoVendido = concesionaria.buscarAuto(patente);
    autoVendido.vendido = true;
  },

  autosParaLaVenta: () => {
    let paraVender = autos.filter((auto) => auto.vendido === false);

    return paraVender;
  },

  autosNuevos: () => {
    let paraVender = concesionaria.autosParaLaVenta();
    let zeroKM = paraVender.filter((auto) => auto.km <= 100);

    return zeroKM;
  },

  listaDeVentas: () => {
    let listaPrecios = [];
    autos.forEach((auto) => {
      auto.vendido === true ? listaPrecios.push(auto.precio) : null;
    });

    return listaPrecios;
  },

  totalDeVentas: () => {
    let total = autos.reduce(
      (acc, curr) => (curr.vendido === true ? acc + curr.precio : 0),
      0
    );

    return total;
  },

  puedeComprar: (auto, persona) => {
    if (
      auto.precio > persona.capacidadDePagoTotal ||
      auto.precio / auto.cuotas > persona.capacidadDePagoEnCuotas
    ) {
      return false;
    } else {
      return true;
    }
  },

  autosQuePuedeComprar: (persona) => {
    let paraVender = concesionaria.autosParaLaVenta();
    let posibles = [];

    paraVender.map((auto) => {
      if (concesionaria.puedeComprar(auto, persona)) {
        posibles.push(auto);
      }
    });
    return posibles;
  },
};

console.log(concesionaria.autosQuePuedeComprar(personas[0]));
