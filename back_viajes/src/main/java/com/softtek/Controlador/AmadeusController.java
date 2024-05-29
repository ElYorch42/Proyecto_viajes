package com.softtek.Controlador;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightDate;
import com.amadeus.resources.FlightDestination;
import com.amadeus.resources.FlightOfferSearch;
import com.amadeus.shopping.Activity;
import com.softtek.Modelo.ViajeAmadeus;
import com.softtek.Servicio.servicioCliente.IClienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/amadeus")
@CrossOrigin(origins = "http://localhost:4200")
public class AmadeusController {
    //TODO 3 primeras actividades aleatorios que salgan
    //TODO lo del hotel
    //TODO los vuelos hay 3 el directo, el mas barato, y el mas corto

    @Autowired
    private IClienteServicio servicio;

    Amadeus amadeus = Amadeus.builder("SDQgK5WagsZak3lwFMGEhvu5qAynO6XO","3pAo5YFd1EmPArG3").build();

    @PostMapping
    public ResponseEntity<String> obtenerviajes(@RequestBody ViajeAmadeus viajeAmadeus) {
        try {
            FlightOfferSearch[] flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params.with("originLocationCode", viajeAmadeus.getOriginLocationCode())
                            .and("destinationLocationCode", viajeAmadeus.getDestinationLocationCode())
                            .and("departureDate", viajeAmadeus.getDepartureDate())
                            .and("returnDate", viajeAmadeus.getReturnDate())
                            .and("adults", 2)
                            .and("travelClass", "ECONOMY")
                            .and("nonStop", viajeAmadeus.isNonStop())
                            .and("max", 20));
            if (flightOffersSearches[0].getResponse().getStatusCode() != 200) {
                System.out.println();
                return new ResponseEntity<>("Wrong status code: " + flightOffersSearches[0].getResponse().getStatusCode(), HttpStatus.BAD_REQUEST);
            } else {
                double precio= Double.parseDouble(flightOffersSearches[0].getPrice().getTotal());
                int n=0;
                for (int i = 0; i < flightOffersSearches.length; i++) {
                    if (precio>Double.parseDouble(flightOffersSearches[i].getPrice().getTotal())){
                        precio = Double.parseDouble(flightOffersSearches[i].getPrice().getTotal());
                        n=i;
                    }
                }

                return new ResponseEntity<>(flightOffersSearches[n].toString(),HttpStatus.OK);
            }
        } catch (ResponseException e) {
            throw new RuntimeException(e);
        }
    }
    /*
    @PostMapping
    public ResponseEntity<String> obtenerActividades() {
    Activity[] activities = amadeus.shopping.activities.get(Params
            .with("latitude", "41.39715")
            .and("longitude", "2.160873"));
    }
     */
    /*
    @PostMapping
    public ResponseEntity<String> obtenerHoteles() {
    
    }
     */

}
