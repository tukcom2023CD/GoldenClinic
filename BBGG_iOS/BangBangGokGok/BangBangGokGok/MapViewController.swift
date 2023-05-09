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
        
        let center = CLLocationCoordinate2D(latitude: 37.5665, longitude: 126.9780)
        let span = MKCoordinateSpan(latitudeDelta: 0.1, longitudeDelta: 0.1)
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
    
    func mapView(_ mapView: MKMapView, regionDidChangeAnimated animated: Bool) {
        let mapWidthInPixels = mapView.bounds.width
        let metersPerPixel = mapView.visibleMapRect.size.width / Double(mapWidthInPixels)
        let scale = metersPerPixel * MKMapSize.world.width / 1000
    }
    
    @IBAction func btnStart(_ sender: UIButton) {
        
    }
} // MapViewController
