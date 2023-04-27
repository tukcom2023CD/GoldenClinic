//
//  MapViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/04/04.
//

import UIKit
import MapKit

class MapViewController: UIViewController, CLLocationManagerDelegate {
    @IBOutlet weak var myMap: MKMapView!
    let loctionManger = CLLocationManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        loctionManger.delegate = self
        loctionManger.desiredAccuracy = kCLLocationAccuracyBest
        loctionManger.requestWhenInUseAuthorization()
        loctionManger.startUpdatingLocation()
        myMap.showsUserLocation = true
        
        setAnnotation(latitudeValue: 37.75, longitudeValue: 128.87, delta: 1, title: "한폴대 강릉", subtitle: "여기는 한폴대")
        setAnnotation(latitudeValue: 39.00, longitudeValue: 128.87, delta: 1, title: "북조선인민민주주의공화국", subtitle: "여기는 북한")
        setAnnotation(latitudeValue: 35.98, longitudeValue: 129.88, delta: 1, title: "대한민국", subtitle: "여기는 남한")
        setAnnotation(latitudeValue: 34.63, longitudeValue: 126.60, delta: 1, title: "KOREA", subtitle: "여기는 남한")
    }
    
    override func viewWillAppear(_ animated: Bool) {
        navigationItem.hidesBackButton = true
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
    
    @IBAction func btnStart(_ sender: UIButton) {
        
    }
} // MapViewController
