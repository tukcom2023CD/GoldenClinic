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
        
        setAnnotation(latitudeValue: 37.56471, longitudeValue: 126.97512, delta: 1, title: "서울특별시", subtitle: "서울특별시")
        setAnnotation(latitudeValue: 36.15299, longitudeValue: 128.34538, delta: 1, title: "구미시", subtitle: "경상북도 구미시")
        setAnnotation(latitudeValue: 37.33972, longitudeValue: 126.73354, delta: 1, title: "시흥시", subtitle: "경기도 시흥시")
        setAnnotation(latitudeValue: 35.89086, longitudeValue: 128.59930, delta: 1, title: "대구광역시", subtitle: "대구광역시")
        setAnnotation(latitudeValue: 35.1798, longitudeValue: 129.0756, delta: 1, title: "부산광역시", subtitle: "부산광역시")
        setAnnotation(latitudeValue: 35.1601, longitudeValue: 126.8514, delta: 1, title: "광주광역시", subtitle: "광주광역시")
        setAnnotation(latitudeValue: 36.3552, longitudeValue: 128.7049, delta: 1, title: "의성군", subtitle: "경상북도 의성군")
        setAnnotation(latitudeValue: 34.8119, longitudeValue: 126.3928, delta: 1, title: "목포시", subtitle: "전라남도 목포시")

//        let center = CLLocationCoordinate2D(latitude: 36.5, longitude: 127.5)
//        let span = MKCoordinateSpan(latitudeDelta: 5, longitudeDelta: 5)
//        let region = MKCoordinateRegion(center: center, span: span)
//        tripMapView.setRegion(region, animated: true)
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
