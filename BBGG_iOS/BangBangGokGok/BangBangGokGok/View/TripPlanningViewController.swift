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
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        dataInit()
        
        planningTableView.dataSource = self
        planningTableView.delegate = self
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

}
