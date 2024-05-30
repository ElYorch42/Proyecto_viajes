package com.softtek.Controlador;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOfferSearch;
import com.amadeus.resources.Hotel;
import com.amadeus.resources.HotelOfferSearch;
import com.softtek.Modelo.AmadeusHotel;
import com.softtek.Modelo.AmadeusViaje;
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

    @PostMapping("/viajes")
    public ResponseEntity<String> obtenerviajes(@PathVariable AmadeusViaje amadeusViaje) {
        try {
            FlightOfferSearch[] flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params.with("originLocationCode", amadeusViaje.getOriginLocationCode())
                            .and("destinationLocationCode", amadeusViaje.getDestinationLocationCode())
                            .and("departureDate", amadeusViaje.getDepartureDate())
                            .and("returnDate", amadeusViaje.getReturnDate())
                            .and("adults", amadeusViaje.getAdults())
                            .and("travelClass", "ECONOMY")
                            .and("nonStop", amadeusViaje.isNonStop())
                            .and("max", 20));
            if (flightOffersSearches[0].getResponse().getStatusCode() != 200) {
                System.out.println();
                return new ResponseEntity<>("Wrong status code: " + flightOffersSearches[0].getResponse().getStatusCode(), HttpStatus.BAD_REQUEST);
            } else {
                double precio = Double.parseDouble(flightOffersSearches[0].getPrice().getTotal());
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

    @PostMapping("/hoteles")
    public ResponseEntity<AmadeusHotel> obtenerHoteles(@PathVariable AmadeusHotel amadeusHotel) {
        try {
            Hotel[] hotels = amadeus.referenceData.locations.hotels.byCity.get(Params
                    .with("cityCode", amadeusHotel.getCityCode())
                    .and("radius", amadeusHotel.getRadius())
                    .and("radiusUnit", "KM")
                    .and("ratings", amadeusHotel.getRatings())
                    .and("max", "20"));
            if (hotels[0].getResponse().getStatusCode() !=200) {
                amadeusHotel.setNombre_hotel("ERROR:"+hotels[0].getResponse().getStatusCode());
                return new ResponseEntity<>(amadeusHotel,HttpStatus.BAD_REQUEST);
            } else {
                for (int i = 0; i < hotels.length; i++) {
                    HotelOfferSearch[] offers = amadeus.shopping.hotelOffersSearch.get(Params
                            .with("hotelIds", hotels[i].getHotelId())
                            .and("adults", amadeusHotel.getAdults())
                            .and("checkInDate", "2023-11-22")
                            .and("roomQuantity", 1)
                            .and("paymentPolicy", "NONE")
                            .and("bestRateOnly", true));
                }
            }
        } catch (ResponseException e) {
            throw new RuntimeException(e);
        }
    }

}

