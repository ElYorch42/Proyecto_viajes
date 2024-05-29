package com.softtek;
import com.softtek.Modelo.Destinos;
import com.softtek.Servicio.DestinosServicio;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class BackViajesApplicationTests {

	DestinosServicio servicio;

	@Test
	@DisplayName("Prueba de destinos")
	void contextLoads() {
		Destinos d = new Destinos();
		d.setId(1);
		d.setNombre("Tokio");
		d.setCodigo_Ciudad("TYO");
		d.setAeropuerto("Aeropuerto Internacional de Narita, Aeropuerto de Haneda");
		d.setTipoLocalidad("ciudad");

		assertThat(d).isNotNull();

		
	}

}
