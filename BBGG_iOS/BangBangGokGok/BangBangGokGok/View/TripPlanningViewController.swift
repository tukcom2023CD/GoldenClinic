//
//  TripPlanningViewController.swift
//  BangBangGokGok
//
//  Created by 권태우 on 2023/06/21.
//

import UIKit
import MapKit

class TripPlanningViewController: UIViewController, CLLocationManagerDelegate, MKMapViewDelegate, UITableViewDataSource, UITableViewDelegate {
    @IBOutlet weak var planningTableView: UITableView!
    @IBOutlet weak var tripMapView: MKMapView!
    
    var dataArray: [String] = []
    let loctionManger = CLLocationManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        dataInit()
        
        planningTableView.dataSource = self
        planningTableView.delegate = self
        
        tripMapView.delegate = self
        loctionManger.delegate = self
        loctionManger.desiredAccuracy = kCLLocationAccuracyBest
        loctionManger.requestWhenInUseAuthorization()
        loctionManger.startUpdatingLocation()
        
        tripMapView.showsUserLocation = true // show user location
        tripMapView.isRotateEnabled = false // rotation available
        tripMapView.isPitchEnabled = false // angle change available
        
        setAnnotation(latitudeValue: 37.478194, longitudeValue: 127.010413, delta: 1, title: "예술의 전당", subtitle: "서울특별시")
        setAnnotation(latitudeValue: 37.577617, longitudeValue: 126.976537, delta: 1, title: "경복궁", subtitle: "서울특별시")
        setAnnotation(latitudeValue: 37.511450, longitudeValue: 127.098021, delta: 1, title: "롯데월드", subtitle: "서울특별시")
        setAnnotation(latitudeValue: 37.551169, longitudeValue: 126.988227, delta: 1, title: "N서울타워", subtitle: "서울특별시")
        setAnnotation(latitudeValue: 37.548225, longitudeValue: 126.918556, delta: 1, title: "옥동식 합정점", subtitle: "서울특별시")
        setAnnotation(latitudeValue: 37.497214, longitudeValue: 127.033417, delta: 1, title: "을밀대 강남점", subtitle: "서울특별시")
        setAnnotation(latitudeValue: 37.584107, longitudeValue: 126.974248, delta: 1, title: "청와대", subtitle: "서울특별시")
        setAnnotation(latitudeValue: 37.519535, longitudeValue: 126.940993, delta: 1, title: "63빌딩", subtitle: "서울특별시")

        let center = CLLocationCoordinate2D(latitude: 37.56471, longitude: 126.97512)
        let span = MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2)
        let region = MKCoordinateRegion(center: center, span: span)
        tripMapView.setRegion(region, animated: true)
    }
    
    func dataInit() {
        dataArray.append("예술의 전당")
        dataArray.append("경복궁")
        dataArray.append("롯데월드")
        dataArray.append("N서울타워")
        dataArray.append("옥동식 합정점")
        dataArray.append("을밀대 강남점")
        dataArray.append("청와대")
        dataArray.append("63빌딩")
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return dataArray.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "planningTableCell", for: indexPath)

//        cell.textLabel?.text = dataArray[indexPath.row]
        
        var content = cell.defaultContentConfiguration()
        content.text = dataArray[indexPath.row]
        content.image = UIImage(systemName: "figure.walk")
        cell.contentConfiguration = content
        
        return cell
    }

    func goLocation(latitudeValue: CLLocationDegrees, longitudeValue: CLLocationDegrees, delta span: Double) -> CLLocationCoordinate2D {
        let pLocation = CLLocationCoordinate2DMake(latitudeValue, longitudeValue)
        let spanValue = MKCoordinateSpan(latitudeDelta: span, longitudeDelta: span)
        let pRegion = MKCoordinateRegion(center: pLocation, span: spanValue)
        
        tripMapView.setRegion(pRegion, animated: true)
        
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
        
        tripMapView.addAnnotation(annotaion)
    }
}
