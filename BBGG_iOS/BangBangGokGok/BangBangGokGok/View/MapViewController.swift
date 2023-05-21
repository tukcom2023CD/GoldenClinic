//
//  MapViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/04/04.
//

import UIKit
import MapKit

class MapViewController: UIViewController, CLLocationManagerDelegate, MKMapViewDelegate {
    @IBOutlet weak var myMap: MKMapView!
    let loctionManger = CLLocationManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        myMap.delegate = self
        loctionManger.delegate = self
        loctionManger.desiredAccuracy = kCLLocationAccuracyBest
        loctionManger.requestWhenInUseAuthorization()
        loctionManger.startUpdatingLocation()
        
        myMap.showsUserLocation = true // show user location
        myMap.isZoomEnabled = false // zoom available
        myMap.isScrollEnabled = false // scroll available
        myMap.isRotateEnabled = false // rotation available
        myMap.isPitchEnabled = false // angle change available
        
        setAnnotation(latitudeValue: 37.56471, longitudeValue: 126.97512, delta: 1, title: "서울특별시", subtitle: "서울특별시")
        setAnnotation(latitudeValue: 36.15299, longitudeValue: 128.34538, delta: 1, title: "구미시", subtitle: "경상북도 구미시")
        setAnnotation(latitudeValue: 37.33972, longitudeValue: 126.73354, delta: 1, title: "시흥시", subtitle: "경기도 시흥시")
        setAnnotation(latitudeValue: 35.89086, longitudeValue: 128.59930, delta: 1, title: "대구광역시", subtitle: "대구광역시")
        setAnnotation(latitudeValue: 35.1798, longitudeValue: 129.0756, delta: 1, title: "부산광역시", subtitle: "부산광역시")
        setAnnotation(latitudeValue: 35.1601, longitudeValue: 126.8514, delta: 1, title: "광주광역시", subtitle: "광주광역시")
        setAnnotation(latitudeValue: 36.3552, longitudeValue: 128.7049, delta: 1, title: "의성군", subtitle: "경상북도 의성군")
        setAnnotation(latitudeValue: 34.8119, longitudeValue: 126.3928, delta: 1, title: "목포시", subtitle: "전라남도 목포시")
        setAnnotation(latitudeValue: 37.3202, longitudeValue: 126.8309, delta: 1, title: "안산시", subtitle: "경기도 안산시")
        setAnnotation(latitudeValue: 38.1473, longitudeValue: 127.3047, delta: 1, title: "철원군", subtitle: "강원도 철원군")
        setAnnotation(latitudeValue: 33.5008, longitudeValue: 126.5467, delta: 1, title: "제주시", subtitle: "제주특별자치도 제주시")
        setAnnotation(latitudeValue: 33.2481, longitudeValue: 126.5622, delta: 1, title: "서귀포시", subtitle: "제주특별자치도 서귀포시")
        setAnnotation(latitudeValue: 36.4801, longitudeValue: 127.2892, delta: 1, title: "세종특별자치시", subtitle: "세종특별자치시")

        let center = CLLocationCoordinate2D(latitude: 36.5, longitude: 127.5)
        let span = MKCoordinateSpan(latitudeDelta: 5, longitudeDelta: 5)
        let region = MKCoordinateRegion(center: center, span: span)
        myMap.setRegion(region, animated: true)
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

    func goLocation(latitudeValue: CLLocationDegrees, longitudeValue: CLLocationDegrees, delta span: Double) -> CLLocationCoordinate2D {
        let pLocation = CLLocationCoordinate2DMake(latitudeValue, longitudeValue)
        let spanValue = MKCoordinateSpan(latitudeDelta: span, longitudeDelta: span)
        let pRegion = MKCoordinateRegion(center: pLocation, span: spanValue)
        
        myMap.setRegion(pRegion, animated: true)
        
        return pLocation
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let pLocation = locations.last
        _ = goLocation(latitudeValue: (pLocation?.coordinate.latitude)!, longitudeValue: (pLocation?.coordinate.longitude)!, delta: 0.01)
        
        CLGeocoder().reverseGeocodeLocation(pLocation!, completionHandler: {
            (placemarks, error) -> Void in
            let pm = placemarks!.first
            let country = pm!.country
            var adress:String = country!
            if pm!.locality != nil {
                adress += " "
                adress += pm!.locality!
            }
            if pm!.thoroughfare != nil {
                adress += " "
                adress += pm!.thoroughfare!
            }
            
        })
        
    }

    func setAnnotation(latitudeValue: CLLocationDegrees, longitudeValue: CLLocationDegrees, delta span: Double, title strTitle: String, subtitle strSubtitle: String){
        let annotaion  = MKPointAnnotation()
        
        annotaion.coordinate = goLocation(latitudeValue: latitudeValue, longitudeValue: longitudeValue, delta: span)
        annotaion.title = strTitle
        annotaion.subtitle = strSubtitle
        
        myMap.addAnnotation(annotaion)
    }
    
//    func mapView(_ mapView: MKMapView, regionDidChangeAnimated animated: Bool) {
//        let mapWidthInPixels = mapView.bounds.width
//        let metersPerPixel = mapView.visibleMapRect.size.width / Double(mapWidthInPixels)
//        let scale = metersPerPixel * MKMapSize.world.width / 1000
//    }
} // MapViewController
