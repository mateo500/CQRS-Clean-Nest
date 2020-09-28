import { ListarDiasDescuentosHelper } from 'src/dominio/usuario/servicio/helpers/listar-dias-descuento.helper';
import { ServicioListarDiasDescuentos } from 'src/dominio/usuario/servicio/servicio-listar-dias-descuento';

describe('ServicioListarDiasDescuentos', () => {
  let servicioListarDiasDescuentos: ServicioListarDiasDescuentos;
  const listarDiasDescuentosHelperStub: ListarDiasDescuentosHelper = new ListarDiasDescuentosHelper();

  beforeEach(() => {
    servicioListarDiasDescuentos = new ServicioListarDiasDescuentos(
      listarDiasDescuentosHelperStub,
    );
  });

  it('deberia listar los dias de descuento disponibles', async () => {
    expect(
      Array.isArray(
        (await servicioListarDiasDescuentos.ejecutar()).diasDeDescuento,
      ),
    ).toBeTruthy();
  });
});
