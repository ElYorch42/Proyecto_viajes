package com.softtek.Controlador;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.Activity;
import com.amadeus.resources.FlightOfferSearch;
import com.amadeus.resources.Hotel;
import com.amadeus.resources.HotelOfferSearch;
import com.softtek.Modelo.AmadeusDatos;
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
    public ResponseEntity<String> obtenerviajes(@RequestBody AmadeusViaje amadeusViaje) {
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

                return new ResponseEntity<>(flightOffersSearches[n].getPrice().getTotal(),HttpStatus.OK);
            }

        } catch (ResponseException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/hoteles")
    public ResponseEntity<AmadeusHotel> obtenerHoteles(@RequestBody AmadeusHotel amadeusHotel) {
        try {
            Hotel[] hotels = amadeus.referenceData.locations.hotels.byCity.get(Params
                    .with("cityCode", amadeusHotel.getCityCode())
                            .and("ratings", amadeusHotel.getRatings())
                    /*
                    .and("radius", amadeusHotel.getRadius())
                    .and("radiusUnit", "KM")
                    .and("max", "20")
                     */
            );
            if (hotels[0].getResponse().getStatusCode() !=200) {
                amadeusHotel.setNombre_hotel("ERROR:"+hotels[0].getResponse().getStatusCode());
                return new ResponseEntity<>(amadeusHotel,HttpStatus.BAD_REQUEST);
            } else {
                /*
                HotelOfferSearch[] offers = null;
                double precioHotel = Double.MAX_VALUE;
                int n=0;
                int m=0;

                for (int i = 0; i < hotels.length; i++) {

                    offers = amadeus.shopping.hotelOffersSearch.get(Params
                            .with("hotelIds", hotels[i].getHotelId())

                            .and("adults", amadeusHotel.getAdults())
                            .and("checkInDate", amadeusHotel.getCheckInDate())
                            .and("checkOutDate", amadeusHotel.getCheckOutDate())
                            .and("roomQuantity", 1)
                            .and("paymentPolicy", "NONE")
                            .and("bestRateOnly", true)
                            .and("max", "20")


                    );
                    if (offers[i].isAvailable()) {
                        for (int j = 0; j < offers[0].getOffers().length; j++) {

                            if (precioHotel> Double.parseDouble(offers[0].getOffers()[j].getPrice().getTotal())) {
                                precioHotel = Double.parseDouble(offers[0].getOffers()[j].getPrice().getTotal());
                                n=i;
                                m=j;
                            }
                        }
                    }
                }

                amadeusHotel.setNombre_hotel(offers[n].getHotel().getName());
                amadeusHotel.setId_hotel(Integer.parseInt(offers[n].getHotel().getHotelId()));
                amadeusHotel.setLatitud(offers[n].getHotel().getLatitude());
                amadeusHotel.setLatitud(offers[n].getHotel().getLongitude());
                amadeusHotel.setPrecio(Double.parseDouble(offers[n].getOffers()[m].getPrice().getTotal()));
                 */
                amadeusHotel.setNombre_hotel(hotels[0].getName());
                amadeusHotel.setId_hotel(hotels[0].getHotelId());
                amadeusHotel.setLatitud(hotels[0].getGeoCode().getLatitude());
                amadeusHotel.setLengitud(hotels[0].getGeoCode().getLongitude());
                switch (amadeusHotel.getRatings()){
                    case 1:
                        amadeusHotel.setPrecio(Math.random()*(40-20)+20);
                        break;
                    case 3:
                        amadeusHotel.setPrecio(Math.random()*(80-50)+50);
                        break;
                    case 5:
                        amadeusHotel.setPrecio(Math.random()*(150-100)+100);
                        break;
                    default:
                        amadeusHotel.setPrecio(100);
                        break;
                }

                Activity[] activities = amadeus.shopping.activities.get(Params
                        .with("latitude", hotels[0].getGeoCode().getLatitude())
                        .and("longitude", hotels[0].getGeoCode().getLongitude())
                        //.and("max",3)
                );

                if (activities[0].getResponse().getStatusCode() !=200) {
                    amadeusHotel.setActividad1("ERROR:"+activities[0].getResponse().getStatusCode());
                    return new ResponseEntity<>(amadeusHotel,HttpStatus.BAD_REQUEST);
                } else {
                    amadeusHotel.setActividad1(activities[0].getName());
                    amadeusHotel.setActividad2(activities[1].getName());
                    amadeusHotel.setActividad3(activities[2].getName());
                    //amadeusHotel.setPrecio_actividades(Double.parseDouble(activities[0].getPrice().getAmount())+
                    //        Double.parseDouble(activities[1].getPrice().getAmount())+
                    //        Double.parseDouble(activities[2].getPrice().getAmount()));
                    amadeusHotel.setPrecio_actividades((Math.random()*(40-20)+20)*3);
                    return new ResponseEntity<>(amadeusHotel,HttpStatus.OK);
                }

                //return new ResponseEntity<>(amadeusHotel,HttpStatus.OK);
            }
        } catch (ResponseException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping
    public ResponseEntity<AmadeusDatos> obtenerTodo(@RequestBody AmadeusDatos amadeusDatos) {
        try {
            FlightOfferSearch[] flightOffersSearches = amadeus.shopping.flightOffersSearch.get(
                    Params.with("originLocationCode", amadeusDatos.getOriginLocationCode())
                            .and("destinationLocationCode", amadeusDatos.getDestinationLocationCode())
                            .and("departureDate", amadeusDatos.getDepartureDate())
                            .and("returnDate", amadeusDatos.getReturnDate())
                            .and("adults", amadeusDatos.getAdults())
                            .and("travelClass", "ECONOMY")
                            .and("nonStop", amadeusDatos.isNonStop())
                            .and("max", 20));
            if (flightOffersSearches[0].getResponse().getStatusCode() != 200) {
                System.out.println();
                amadeusDatos.setNombre_hotel("ERROR:"+flightOffersSearches[0].getResponse().getStatusCode());
                return new ResponseEntity<>(amadeusDatos,HttpStatus.BAD_REQUEST);
            } else {
                double precio = Double.parseDouble(flightOffersSearches[0].getPrice().getTotal());
                int n=0;
                for (int i = 0; i < flightOffersSearches.length; i++) {
                    if (precio>Double.parseDouble(flightOffersSearches[i].getPrice().getTotal())){
                        precio = Double.parseDouble(flightOffersSearches[i].getPrice().getTotal());
                        n=i;
                    }
                }
                amadeusDatos.setPrecioViaje(Double.parseDouble(flightOffersSearches[n].getPrice().getTotal()));

                Hotel[] hotels = amadeus.referenceData.locations.hotels.byCity.get(Params
                        .with("cityCode", amadeusDatos.getOriginLocationCode())
                        .and("ratings", amadeusDatos.getRatings()));
                if (hotels[0].getResponse().getStatusCode() !=200) {
                    amadeusDatos.setNombre_hotel("ERROR:"+hotels[0].getResponse().getStatusCode());
                    return new ResponseEntity<>(amadeusDatos,HttpStatus.BAD_REQUEST);
                } else{
                    amadeusDatos.setNombre_hotel(hotels[0].getName());
                    amadeusDatos.setId_hotel(hotels[0].getHotelId());
                    amadeusDatos.setLatitud(hotels[0].getGeoCode().getLatitude());
                    amadeusDatos.setLatitud(hotels[0].getGeoCode().getLongitude());
                    switch (amadeusDatos.getRatings()){
                        case 1:
                            amadeusDatos.setPrecioHotel(Math.random()*(50-100)+50);
                            break;
                        case 3:
                            amadeusDatos.setPrecioHotel(Math.random()*(120-200)+120);
                            break;
                        case 5:
                            amadeusDatos.setPrecioHotel(Math.random()*(400-800)+400);
                            break;
                        default:
                            amadeusDatos.setPrecioHotel(100);
                            break;
                    }

                    Activity[] activities = amadeus.shopping.activities.get(Params
                            .with("latitude", hotels[0].getGeoCode().getLatitude())
                            .and("longitude", hotels[0].getGeoCode().getLongitude())
                            .and("max",3)
                    );

                    if (activities[0].getResponse().getStatusCode() !=200) {
                        amadeusDatos.setActividad1("ERROR:"+activities[0].getResponse().getStatusCode());
                        return new ResponseEntity<>(amadeusDatos,HttpStatus.BAD_REQUEST);
                    } else {
                        amadeusDatos.setActividad1(activities[0].getName());
                        amadeusDatos.setActividad2(activities[1].getName());
                        amadeusDatos.setActividad3(activities[2].getName());
                        amadeusDatos.setPrecio_actividades((Math.random()*(40-20)+20)*3);
                        return new ResponseEntity<>(amadeusDatos,HttpStatus.OK);
                    }
                }
            }
        } catch (ResponseException e) {
            throw new RuntimeException(e);
        }
    }
}

