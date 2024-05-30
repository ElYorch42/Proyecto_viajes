package com.softtek;

import com.softtek.Controlador.ControladorDestinos;
import com.softtek.Dto.DestinosDto;
import com.softtek.Modelo.Destinos;
import com.softtek.Servicio.IDestinoServicio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class BackViajesApplicationTests {

	@InjectMocks
	private ControladorDestinos controladorDestinos;

	@Mock
	private IDestinoServicio servicio;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	@DisplayName("Prueba de destinos")
	void contextLoads() {
		// Arrange
		Destinos destino1 = new Destinos();
		destino1.setCodigo_Ciudad("123");
		destino1.setAeropuerto("prueba1");
		destino1.setNombre("preuba1");
		destino1.setTipoLocalidad("preuba1");

		Destinos destino2 = new Destinos();
		destino2.setCodigo_Ciudad("456");
		destino2.setAeropuerto("prueba2");
		destino2.setNombre("preuba2");
		destino2.setTipoLocalidad("preuba2");

		List<Destinos> destinosBBDD = new ArrayList<>();
		destinosBBDD.add(destino1);
		destinosBBDD.add(destino2);

		when(servicio.obtener()).thenReturn(destinosBBDD);

		// Act
		ResponseEntity<List<DestinosDto>> response = controladorDestinos.obtenerTodos();

		// Assert
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(2, response.getBody().size());

	}

}
