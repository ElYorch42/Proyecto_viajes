package com.softtek.Controlador;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import com.softtek.Servicio.servicioCliente.IClienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/amadeus")
@CrossOrigin(origins = "http://localhost:4200")
public class AmadeusController {

    @Autowired
    private IClienteServicio servicio;

    Amadeus amadeus = Amadeus.builder("SDQgK5WagsZak3lwFMGEhvu5qAynO6XO","3pAo5YFd1EmPArG3").build();

    @PostMapping
    public ResponseEntity<String> obtenerviajes() {
        try {
            FlightOfferSearch[] flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params.with("originLocationCode", "SYD")
                            .and("destinationLocationCode", "BKK")
                            .and("departureDate", "2023-11-01")
                            .and("returnDate", "2023-11-08")
                            .and("adults", 2)
                            .and("max", 3));
            if (flightOffersSearches[0].getResponse().getStatusCode() != 200) {
                System.out.println();
                return new ResponseEntity<>("Wrong status code: " + flightOffersSearches[0].getResponse().getStatusCode(), HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(flightOffersSearches[0].toString(),HttpStatus.OK);
            }

        } catch (ResponseException e) {
            throw new RuntimeException(e);
        }
    }


}
